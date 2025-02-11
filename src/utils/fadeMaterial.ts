import { WebGLProgramParametersWithUniforms } from "three"

import exponentialEasing from "./shaders/exponentialEasing.glsl"
import shader from "./shaders/shader.glsl"

const replaceFragmentShader = (fragmentShader: string): string =>
  fragmentShader
    .replace(`#include <common>`, exponentialEasing)
    .replace(`vec4 diffuseColor = vec4( diffuse, opacity );`, shader)

export const fadeOnBeforeCompile = (
  shader: WebGLProgramParametersWithUniforms
): void => {
  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader)
}

export const fadeOnBeforeCompileFlat = (
  shader: WebGLProgramParametersWithUniforms
): void => {
  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader).replace(
    `#include <output_fragment>`,
    `gl_FragColor = diffuseColor;`
  )
}
