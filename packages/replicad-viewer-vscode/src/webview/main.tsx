import React from "react";
import { createRoot } from "react-dom/client";
import "replicad-opencascadejs/src/replicad_single.wasm?url";
import * as THREE from "three";
import App, { AppAPI } from "./App";
import { GlobalStyle } from "./GlobalStyle";
import "./index.css";

THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

export interface ReplicadAPIOptions {
  initialCode?: string;
  onApiCreated?: (api: AppAPI) => void;
}

export const ReplicadAPI = {
  initializeViewer: (options: ReplicadAPIOptions): void => {
    const { onApiCreated, initialCode } = options;
    createRoot(document.getElementById("root")!).render(
      // todo create context with static asset uris and message passing
      <React.StrictMode>
        <GlobalStyle />
        <App initialCode={initialCode} onApiCreated={onApiCreated} />
      </React.StrictMode>
    );
  },
};
