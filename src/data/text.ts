import { Vector3 } from "three"

import { TextData } from "../types/TextData"

export default (curveData: Vector3[]): TextData[] => {
  return [
    {
      cameraRailDist: -1,
      position: new Vector3(curveData[1].x - 3, curveData[1].y, curveData[1].z),
      subtitle: `Welcome to my flight scene,
scroll through your flight`,
    },
    {
      cameraRailDist: 1.5,
      position: new Vector3(curveData[2].x + 2, curveData[2].y, curveData[2].z),
      title: "Stack",
      subtitle: `This project was made with ReactJS, ThreeJS, GSAP & React Three Fiber + Drei`,
    },
    {
      cameraRailDist: -1,
      position: new Vector3(curveData[3].x - 3, curveData[3].y, curveData[3].z),
      title: "Inspiration",
      subtitle: `This website concept was inspired by the Atmos team`,
    },
    {
      cameraRailDist: 1.5,
      position: new Vector3(
        curveData[4].x + 3.5,
        curveData[4].y,
        curveData[4].z - 12
      ),
      title: "Credits",
      subtitle: `The models for this experience are from Poly.Pizza under a CC license`,
    },
  ]
}
