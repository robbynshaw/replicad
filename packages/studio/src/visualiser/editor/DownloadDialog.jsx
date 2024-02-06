import React, { useState } from "react";
import { renderToString } from "react-dom/server";

import { fileSave } from "browser-fs-access";
import styled from "styled-components";

import {
  Button,
  ButtonBar,
} from "../../../../replicad-react/lib/components/Button.js";
import {
  Dialog,
  DialogBody,
  DialogButtons,
  DialogTitle,
} from "../../../../replicad-react/lib/components/Dialog.js";

import saveShape from "../../utils/saveShape";
import SVGViewer from "../../viewers/SVGViewer.jsx";
import useEditorStore from "./useEditorStore.jsx";

const Choices = styled.div`
  display: flex;

  flex-direction: row;
  & > :not(:first-child) {
    margin-left: 2em;
  }

  & > label {
    display: flex;
    & > :not(:last-child) {
      margin-right: 0.5em;
    }
  }
`;

export default function DownloadDialog({ onClose }) {
  const store = useEditorStore();

  const isSVG = store.currentMesh[0]?.format === "svg";

  const [saveMode, setSaveMode] = useState(isSVG ? "svg" : "step");

  const onDownload = async () => {
    if (saveMode === "svg") {
      await fileSave(
        new Blob(
          [
            renderToString(
              <SVGViewer shape={store.currentMesh} withGrid={false} rawWindow />
            ),
          ],
          {
            type: "image/svg+xml",
          }
        ),
        {
          id: "exports",
          fileName: `${
            store.currentMesh.length === 1
              ? store.currentMesh[0]?.name
              : "replicad-image"
          }.svg`,
          description: "SVG file of the current geometry",
          extensions: [".svg"],
        }
      );
    } else if (saveMode === "json") {
      await fileSave(
        new Blob([JSON.stringify(store.currentMesh)], {
          type: "application/json",
        }),
        {
          id: "exports",
          fileName: "defaultGeometry.json",
          description: "JSON file containing the geometry",
          extensions: [".json"],
        }
      );
    } else {
      try {
        await saveShape("defaultShape", saveMode);
      } catch (e) {
        console.error(e);
      } finally {
        console.log("ending");
      }
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose}>
      <DialogTitle onClose={onClose}>Download this model</DialogTitle>
      <DialogBody>
        <p>Select the format:</p>

        <Choices>
          {isSVG ? (
            <label>
              <input
                checked={saveMode === "svg"}
                type="radio"
                onClick={() => setSaveMode("svg")}
              />
              <span>SVG</span>
            </label>
          ) : (
            <>
              <label>
                <input
                  checked={saveMode === "step"}
                  type="radio"
                  onClick={() => setSaveMode("step")}
                />
                <span>STEP </span>
              </label>
              <label>
                <input
                  checked={saveMode === "stl"}
                  type="radio"
                  onClick={() => setSaveMode("stl")}
                />
                <span>STL</span>
              </label>
              <label>
                <input
                  checked={saveMode === "stl-binary"}
                  type="radio"
                  onClick={() => setSaveMode("stl-binary")}
                />
                <span>STL (binary)</span>
              </label>
            </>
          )}
          <label>
            <input
              checked={saveMode === "json"}
              type="radio"
              onClick={() => setSaveMode("json")}
            />
            <span>JSON</span>
          </label>
        </Choices>
      </DialogBody>
      <DialogButtons>
        <ButtonBar>
          <Button onClick={onClose}>Close</Button>
          <Button solid onClick={onDownload}>
            Download
          </Button>
        </ButtonBar>
      </DialogButtons>
    </Dialog>
  );
}
