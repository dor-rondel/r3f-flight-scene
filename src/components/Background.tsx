import { Environment, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Gradient, LayerMaterial } from "lamina"
import { ReactNode, useRef } from "react"

import { Color, BackSide } from "three"

type BackgroundProps = {
  backgroundColors: React.MutableRefObject<{
    colorA: string
    colorB: string
  }>
}

// type annotation of Gradient not exported from lamina
type GradientElement = ReactNode & {
  colorA: Color
  colorB: Color
}

const Background = ({ backgroundColors }: BackgroundProps) => {
  const start = 0.2
  const end = -0.5

  const gradientRef = useRef<GradientElement>(null)
  const gradientEnvRef = useRef<GradientElement>(null)

  useFrame(() => {
    if (!gradientRef || !gradientEnvRef) return
    gradientRef.current!.colorA = new Color(backgroundColors.current.colorA)
    gradientRef.current!.colorB = new Color(backgroundColors.current.colorB)
    gradientEnvRef.current!.colorA = new Color(backgroundColors.current.colorA)
    gradientEnvRef.current!.colorB = new Color(backgroundColors.current.colorB)
  })

  return (
    <>
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial color='#ffffff' side={BackSide}>
          {/* @ts-ignore */}
          <Gradient ref={gradientRef} axes='y' start={start} end={end} />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256} frames={Infinity}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <LayerMaterial color='#ffffff' side={BackSide}>
            {/* @ts-ignore */}
            <Gradient ref={gradientEnvRef} axes='y' start={start} end={end} />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  )
}

export default Background
