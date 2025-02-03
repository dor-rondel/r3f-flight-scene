import { Instances, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { AdditiveBlending, DoubleSide, MeshBasicMaterial } from "three"

import AccelarationTick from "./AccelarationTick"

const INSTANCES = 240
const MAX_OPACITY = 0.1

const AccelarationTickGroup = () => {
  const speedMaterial = useRef<MeshBasicMaterial>(null)
  const scroll = useScroll()
  const lastScroll = useRef(0)

  useFrame((_state, delta) => {
    if (!speedMaterial?.current) return
    if (scroll.offset - lastScroll.current > 0.0005) {
      speedMaterial.current.opacity = MAX_OPACITY
    }
    lastScroll.current = scroll.offset
    if (speedMaterial.current.opacity > 0) {
      speedMaterial.current.opacity -= delta * 0.2
    }
  })

  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial
          ref={speedMaterial}
          side={DoubleSide}
          blending={AdditiveBlending}
          opacity={0}
          transparent
        />
        {Array(INSTANCES)
          .fill(null)
          .map((_, key) => (
            <AccelarationTick key={key} />
          ))}
      </Instances>
    </group>
  )
}

export default AccelarationTickGroup
