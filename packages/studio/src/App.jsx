import "replicad-opencascadejs/src/replicad_single.wasm?url";

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import LinkWidget, { MakeLink } from "./LinkWidget.jsx";
import Welcome from "./Welcome.jsx";
import Editor from "./visualiser/Editor.jsx";

import { LoadingScreen } from "replicad-react";
import ReloadPrompt from "./ReloadPrompt.jsx";

const Workbench = React.lazy(() => import("./workbench/Workbench.jsx"));

export default function App() {
  return (
    <>
      <ReloadPrompt />
      <Switch>
        <Route path="/editor">
          <Redirect to="/visualiser" />
        </Route>
        <Route path="/visualiser">
          <Editor />
        </Route>
        <Route path="/workbench">
          <React.Suspense fallback={<LoadingScreen />}>
            <Workbench />
          </React.Suspense>
        </Route>
        <Route exact path="/share">
          <MakeLink />
        </Route>
        <Route path="/share/code">
          <LinkWidget />
        </Route>
        <Route path="/share/:shapeURL">
          <LinkWidget />
        </Route>

        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </>
  );
}
