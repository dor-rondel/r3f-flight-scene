import { Float, PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"
import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import {
  Group,
  Vector3,
  CatmullRomCurve3,
  MeshStandardMaterial,
  Shape,
  PerspectiveCamera as PerspectiveCameraTypeAnnotation,
} from "three"

import Airplane from "./Airplane"
import Background from "./Background"
import Cloud from "./Cloud"
import AccelarationTickGroup from "./AccelarationTickGroup"
import TextSection from "./TextSection"

import curveData from "../data/curve"
import makeTextData from "../data/text"
import makeCloudData from "../data/clouds"
import { usePlay } from "../contexts/Play"
import { fadeOnBeforeCompile } from "../utils/fadeMaterial"

import {
  callibrateCamera,
  setSceneOpacity,
  positionCameraToNearestText,
  rotateCameraAndPlane,
} from "../utils/experienceHelper"

const LINE_NB_POINTS = 1000

export const Experience = () => {
  const curvePoints = useMemo<Vector3[]>(() => curveData, [])
  const curve = useMemo(() => {
    return new CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5)
  }, [])

  const sceneOpacity = useRef(0)
  const speedReductionDistance = useRef(1)
  const lineMaterialRef = useRef<MeshStandardMaterial>(null)
  const cameraGroup = useRef<Group>(null)
  const cameraRail = useRef<Group>(null)
  const camera = useRef<PerspectiveCameraTypeAnnotation>(null)
  const scroll = useScroll()
  const lastScroll = useRef(0)
  const airplane = useRef<Group>(null)
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const entryTimeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const exitTimeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  })

  const textSections = useMemo(() => makeTextData(curvePoints), [])
  const clouds = useMemo(() => makeCloudData(curvePoints), [])

  const shape = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(0, -0.08)
    shape.lineTo(0, 0.08)

    return shape
  }, [curve])

  const { play, setHasScroll, end, setEnd } = usePlay()

  useFrame((_state, delta) => {
    callibrateCamera(camera)
    setSceneOpacity({ sceneOpacity, play, end, lineMaterialRef, delta })

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true)
    }
    if (end) return

    positionCameraToNearestText({
      cameraGroup,
      cameraRail,
      delta,
      speedReductionDistance,
      textSections,
    })

    rotateCameraAndPlane({
      scroll,
      delta,
      speedReductionDistance,
      lastScroll,
      timeline,
      curve,
      cameraGroup,
      airplane,
    })

    if (
      cameraGroup.current!.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true)
      exitTimeline.current!.play()
    }
  })

  useLayoutEffect(() => {
    timeline.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    })
    timeline.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#424242",
      colorB: "#ffcc00",
    })
    timeline.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#81318b",
      colorB: "#55ab8f",
    })

    timeline.current.pause()

    entryTimeline.current = entryTimeline.current.pause()
    entryTimeline.current.from(airplane.current!.position, {
      duration: 3,
      z: 5,
      y: -2,
    })

    exitTimeline.current = gsap.timeline()
    exitTimeline.current.pause()

    exitTimeline.current.to(
      airplane.current!.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    )
    exitTimeline.current.to(
      cameraRail.current!.position,
      {
        duration: 8,
        y: 12,
      },
      0
    )
    exitTimeline.current.to(airplane.current!.position, {
      duration: 1,
      z: -1000,
    })
  }, [])

  useEffect(() => {
    if (!entryTimeline) return
    if (play) {
      entryTimeline.current!.play()
    }
  }, [play])

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        <group ref={cameraGroup}>
          <AccelarationTickGroup />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <Airplane
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
            </Float>
          </group>
        </group>

        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />

            <meshStandardMaterial
              color='white'
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {clouds.map((cloud, idx) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={idx} />
        ))}
      </>
    ),
    []
  )
}
