import { MeshStandardMaterial } from "three"

export type SetOpacityArgs = {
  play: boolean
  end: boolean
  delta: number
  sceneOpacity: React.MutableRefObject<number>
  lineMaterialRef: React.RefObject<MeshStandardMaterial>
}
