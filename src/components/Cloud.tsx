import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { fadeOnBeforeCompile } from "../utils/fadeMaterial"

import { GLTF } from "three-stdlib"
import { Mesh, MeshStandardMaterial } from "three"
import { CloudData } from "../types/CloudData"

type CloudGLTFMapping = GLTF & {
  nodes: {
    Mball001: Mesh
  }
}

type CloudProps = CloudData & {
  sceneOpacity: React.MutableRefObject<number>
}

const Cloud = ({ sceneOpacity, ...props }: CloudProps) => {
  const { nodes } = useGLTF("./models/cloud/model.gltf") as CloudGLTFMapping

  const materialRef = useRef<MeshStandardMaterial>(null)

  useFrame(() => {
    if (materialRef?.current) return
    materialRef.current!.opacity = sceneOpacity.current
  })

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent
        />
      </mesh>
    </group>
  )
}

useGLTF.preload("./models/cloud/model.gltf")

export default Cloud
