import { Dispatch } from "react"

export type PlayContextType = {
  play: boolean
  setPlay: Dispatch<React.SetStateAction<boolean>>
  end: boolean
  setEnd: Dispatch<React.SetStateAction<boolean>>
  hasScroll: boolean
  setHasScroll: Dispatch<React.SetStateAction<boolean>>
}
