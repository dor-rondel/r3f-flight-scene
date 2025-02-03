import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { PlayProvider } from "./contexts/Play"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlayProvider>
      <App />
    </PlayProvider>
  </React.StrictMode>
)
