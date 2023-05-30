import * as React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import { createRoot } from 'react-dom/client';
import { App } from "./App"
import './index.css';

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  // <React.StrictMode>
    <>
      <ColorModeScript />
      <App />
    </>
  // {/* </React.StrictMode>, */}
)