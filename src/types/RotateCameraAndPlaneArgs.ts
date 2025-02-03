import { ScrollControlsState } from "@react-three/drei"
import { CatmullRomCurve3, Group, Object3DEventMap } from "three"

export type RotateCameraAndPlaneArgs = {
  scroll: ScrollControlsState
  delta: number
  speedReductionDistance: React.MutableRefObject<number>
  lastScroll: React.MutableRefObject<number>
  timeline: React.MutableRefObject<gsap.core.Timeline>
  curve: CatmullRomCurve3
  cameraGroup: React.RefObject<Group<Object3DEventMap>>
  airplane: React.RefObject<Group<Object3DEventMap>>
}
