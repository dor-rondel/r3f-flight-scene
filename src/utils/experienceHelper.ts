import {
  Group,
  Vector3,
  MathUtils,
  Euler,
  Quaternion,
  PerspectiveCamera,
} from "three"

import { SetOpacityArgs } from "../types/SetOpacityArgs"
import { PositionCameraArgs } from "../types/PositionCameraArgs"
import { RotateCameraAndPlaneArgs } from "../types/RotateCameraAndPlaneArgs"

const CURVE_AHEAD_CAMERA = 0.008
const CURVE_AHEAD_AIRPLANE = 0.02
const AIRPLANE_MAX_ANGLE = 35

export const callibrateCamera = (
  camera: React.RefObject<PerspectiveCamera>
) => {
  if (!camera?.current) return

  const isLandscape = window.innerWidth > window.innerHeight

  if (isLandscape) {
    camera.current.fov = 30
    camera.current.position.z = 5
  } else {
    camera.current.fov = 80
    camera.current.position.z = 2
  }
}

export const setSceneOpacity = ({
  play,
  end,
  delta,
  sceneOpacity,
  lineMaterialRef,
}: SetOpacityArgs) => {
  if (play && !end && sceneOpacity.current < 1) {
    sceneOpacity.current = MathUtils.lerp(sceneOpacity.current, 1, delta * 0.1)
  }

  if (end && sceneOpacity.current > 0) {
    sceneOpacity.current = MathUtils.lerp(sceneOpacity.current, 0, delta)
  }

  lineMaterialRef.current!.opacity = sceneOpacity.current
}

export const positionCameraToNearestText = ({
  textSections,
  cameraGroup,
  delta,
  cameraRail,
  speedReductionDistance,
}: PositionCameraArgs) => {
  const slowedScrollDistance = 42
  let resetCameraRail = true

  textSections.forEach((textSection) => {
    const distance = textSection.position.distanceTo(
      cameraGroup.current!.position
    )

    if (distance < slowedScrollDistance) {
      speedReductionDistance.current = Math.max(
        distance / slowedScrollDistance,
        0.1
      )
      const targetCameraRailPosition = new Vector3(
        (1 - distance / slowedScrollDistance) * textSection.cameraRailDist,
        0,
        0
      )
      cameraRail.current!.position.lerp(targetCameraRailPosition, delta)
      resetCameraRail = false
    }
  })

  if (resetCameraRail) {
    const targetCameraRailPosition = new Vector3(0, 0, 0)
    cameraRail.current!.position.lerp(targetCameraRailPosition, delta)
  }
}

export const rotateCameraAndPlane = ({
  scroll,
  delta,
  speedReductionDistance,
  lastScroll,
  timeline,
  curve,
  cameraGroup,
  airplane,
}: RotateCameraAndPlaneArgs) => {
  const scrollOffset = Math.max(0, scroll.offset) // don't allow negative scroll

  // CALCULATE LERPED SCROLL OFFSET
  let lerpedScrollOffset = MathUtils.lerp(
    lastScroll.current,
    scrollOffset,
    delta * speedReductionDistance.current
  )

  // PROTECT BELOW 0 AND ABOVE 1
  lerpedScrollOffset = Math.min(lerpedScrollOffset, 1)
  lerpedScrollOffset = Math.max(lerpedScrollOffset, 0)

  lastScroll.current = lerpedScrollOffset
  timeline.current!.seek(lerpedScrollOffset * timeline.current!.duration())

  const curPoint = curve.getPoint(lerpedScrollOffset)

  // Follow the curve points
  cameraGroup.current!.position.lerp(curPoint, delta * 24)

  // Make the group look ahead on the curve

  const lookAtPoint = curve.getPoint(
    Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
  )

  const currentLookAt = cameraGroup.current!.getWorldDirection(new Vector3())
  const targetLookAt = new Vector3()
    .subVectors(curPoint, lookAtPoint)
    .normalize()

  const lookAt = currentLookAt.lerp(targetLookAt, delta * 24)
  cameraGroup.current!.lookAt(cameraGroup.current!.position.clone().add(lookAt))

  // Airplane rotation

  const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE)

  const nonLerpLookAt = new Group()
  nonLerpLookAt.position.copy(curPoint)
  nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt))

  tangent.applyAxisAngle(new Vector3(0, 1, 0), -nonLerpLookAt.rotation.y)

  let angle = Math.atan2(-tangent.z, tangent.x)
  angle = -Math.PI / 2 + angle

  let angleDegrees = (angle * 180) / Math.PI
  angleDegrees *= 2.4 // stronger angle

  // LIMIT PLANE ANGLE
  if (angleDegrees < 0) {
    angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE)
  }
  if (angleDegrees > 0) {
    angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE)
  }

  const targetAirplaneQuaternion = new Quaternion().setFromEuler(
    new Euler(
      airplane.current!.rotation.x,
      airplane.current!.rotation.y,
      (angleDegrees * Math.PI) / 180
    )
  )
  airplane.current!.quaternion.slerp(targetAirplaneQuaternion, delta * 2)
}
