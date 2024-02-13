import React from "react";
import { createRoot } from "react-dom/client";
import "replicad-opencascadejs/src/replicad_single.wasm?url";
import * as THREE from "three";
import App from "./App";
import { GlobalStyle } from "./GlobalStyle";
import "./index.css";

THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
