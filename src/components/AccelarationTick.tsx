import { Instance } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, MathUtils } from "three"

const AccelarationTick = () => {
  const ref = useRef<Group>(null)
  let randomPosition = {
    x: 0,
    y: 0,
    z: 0,
  }
  let randomSpeed = 0

  const resetRandom = () => {
    randomPosition = {
      x: MathUtils.randFloatSpread(8),
      y: MathUtils.randFloatSpread(5),
      z: MathUtils.randFloatSpread(8),
    }
    randomSpeed = MathUtils.randFloat(16, 20)
  }
  resetRandom()

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.position.z += randomSpeed * delta
      if (ref.current.position.z > 5) {
        resetRandom()
        ref.current.position.z = randomPosition.z
      }
    }
  })

  return (
    <Instance
      ref={ref}
      color='white'
      position={[randomPosition.x, randomPosition.y, randomPosition.z]}
      rotation-y={Math.PI / 2}
    />
  )
}

export default AccelarationTick
