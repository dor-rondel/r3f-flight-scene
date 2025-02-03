import React, { createContext, useContext, useState } from "react"

import { PlayContextType } from "../types/PlayContextType"

const Context = createContext<PlayContextType>({} as PlayContextType)

type PlayProviderProps = {
  children: React.ReactNode
}

export const PlayProvider = ({ children }: PlayProviderProps) => {
  const [play, setPlay] = useState(false)
  const [end, setEnd] = useState(false)
  const [hasScroll, setHasScroll] = useState(false)

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const usePlay = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider")
  }

  return context
}
