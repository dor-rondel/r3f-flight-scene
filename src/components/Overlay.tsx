import { useProgress } from "@react-three/drei"
import { usePlay } from "../contexts/Play"

export const Overlay = () => {
  const { progress } = useProgress()
  const { play, end, setPlay, hasScroll } = usePlay()
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className='logo'>Flight Scene</h1>
          <p className='intro__scroll'>Scroll to begin your flight</p>
          <button
            className='explore'
            onClick={() => {
              setPlay(true)
            }}
          >
            Take Off
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className='outro__text'>
          Thank you for flying through the experience!
        </p>
      </div>
    </div>
  )
}
