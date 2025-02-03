import { Euler, Vector3 } from "three"
import { CloudData } from "../types/CloudData"

export default (curveData: Vector3[]): CloudData[] => [
  // STARTING
  {
    position: new Vector3(-3.5, -3.2, -7),
  },
  {
    position: new Vector3(3.5, -4, -10),
  },
  {
    scale: new Vector3(4, 4, 4),
    position: new Vector3(-18, 0.2, -68),
    rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
  },
  {
    scale: new Vector3(2.5, 2.5, 2.5),
    position: new Vector3(10, -1.2, -52),
  },
  // FIRST POINT
  {
    scale: new Vector3(4, 4, 4),
    position: new Vector3(
      curveData[1].x + 10,
      curveData[1].y - 4,
      curveData[1].z + 64
    ),
  },
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[1].x - 20,
      curveData[1].y + 4,
      curveData[1].z + 28
    ),
    rotation: new Euler(0, Math.PI / 7, 0),
  },
  {
    rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
    scale: new Vector3(5, 5, 5),
    position: new Vector3(
      curveData[1].x - 13,
      curveData[1].y + 4,
      curveData[1].z - 62
    ),
  },
  {
    rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
    scale: new Vector3(5, 5, 5),
    position: new Vector3(
      curveData[1].x + 54,
      curveData[1].y + 2,
      curveData[1].z - 82
    ),
  },
  {
    scale: new Vector3(5, 5, 5),
    position: new Vector3(
      curveData[1].x + 8,
      curveData[1].y - 14,
      curveData[1].z - 22
    ),
  },
  // SECOND POINT
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[2].x + 6,
      curveData[2].y - 7,
      curveData[2].z + 50
    ),
  },
  {
    scale: new Vector3(2, 2, 2),
    position: new Vector3(
      curveData[2].x - 2,
      curveData[2].y + 4,
      curveData[2].z - 26
    ),
  },
  {
    scale: new Vector3(4, 4, 4),
    position: new Vector3(
      curveData[2].x + 12,
      curveData[2].y + 1,
      curveData[2].z - 86
    ),
    rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
  },
  // THIRD POINT
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[3].x + 3,
      curveData[3].y - 10,
      curveData[3].z + 50
    ),
  },
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[3].x - 10,
      curveData[3].y,
      curveData[3].z + 30
    ),
    rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
  },
  {
    scale: new Vector3(4, 4, 4),
    position: new Vector3(
      curveData[3].x - 20,
      curveData[3].y - 5,
      curveData[3].z - 8
    ),
    rotation: new Euler(Math.PI, 0, Math.PI / 5),
  },
  {
    scale: new Vector3(5, 5, 5),
    position: new Vector3(
      curveData[3].x + 0,
      curveData[3].y - 5,
      curveData[3].z - 98
    ),
    rotation: new Euler(0, Math.PI / 3, 0),
  },
  // FOURTH POINT
  {
    scale: new Vector3(2, 2, 2),
    position: new Vector3(
      curveData[4].x + 3,
      curveData[4].y - 10,
      curveData[4].z + 2
    ),
  },
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[4].x + 24,
      curveData[4].y - 6,
      curveData[4].z - 42
    ),
    rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
  },
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[4].x - 4,
      curveData[4].y + 9,
      curveData[4].z - 62
    ),
    rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
  },
  // FINAL
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[7].x + 12,
      curveData[7].y - 5,
      curveData[7].z + 60
    ),
    rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
  },
  {
    scale: new Vector3(3, 3, 3),
    position: new Vector3(
      curveData[7].x - 12,
      curveData[7].y + 5,
      curveData[7].z + 120
    ),
    rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
  },
]
