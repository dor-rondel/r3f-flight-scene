import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

import { AirplaneGLTFMapping } from "../types/AirplaneGLTFMapping"

const HELIX_SPEED = 6

type AirplaneProps = {
  ["position-y"]: number
  ["rotation-y"]: number
  scale: [number, number, number]
}

const Airplane = (props: AirplaneProps) => {
  const { nodes, materials } = useGLTF(
    "./models/airplane/model.glb"
  ) as AirplaneGLTFMapping

  const helix = useRef<Mesh>(null)

  useFrame((_prev, delta) => {
    if (!helix) return
    helix.current!.rotation.x += delta * HELIX_SPEED
  })

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.PUSHILIN_Plane_Circle000.geometry}>
        <meshStandardMaterial color='white' />
      </mesh>
      <mesh
        ref={helix}
        geometry={nodes.PUSHILIN_Plane_Helix.geometry}
        material={materials.plane}
        position={[1.09, 0.23, 0]}
      >
        <meshStandardMaterial color='white' />
      </mesh>
    </group>
  )
}

useGLTF.preload("./models/airplane/model.glb")

export default Airplane
