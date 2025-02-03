import { Vector3 } from "three"

const CURVE_DISTANCE = 250

export default [
  new Vector3(0, 0, 0),
  new Vector3(0, 0, -CURVE_DISTANCE),
  new Vector3(100, 0, -2 * CURVE_DISTANCE),
  new Vector3(-100, 0, -3 * CURVE_DISTANCE),
  new Vector3(100, 0, -4 * CURVE_DISTANCE),
  new Vector3(0, 0, -5 * CURVE_DISTANCE),
  new Vector3(0, 0, -6 * CURVE_DISTANCE),
  new Vector3(0, 0, -7 * CURVE_DISTANCE),
]
