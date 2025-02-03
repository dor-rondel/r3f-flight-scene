import { MeshStandardMaterial, Mesh } from "three"
import { GLTF } from "three-stdlib"

export type AirplaneGLTFMapping = GLTF & {
  nodes: {
    PUSHILIN_Plane_Circle000: Mesh
    PUSHILIN_Plane_Helix: Mesh
  }
  materials: {
    plane: MeshStandardMaterial
  }
}
