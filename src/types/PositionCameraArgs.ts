import { Object3DEventMap, Group } from "three"
import { TextData } from "./TextData"

export type PositionCameraArgs = {
  textSections: TextData[]
  cameraGroup: React.RefObject<Group<Object3DEventMap>>
  delta: number
  cameraRail: React.RefObject<Group<Object3DEventMap>>
  speedReductionDistance: React.MutableRefObject<number>
}
