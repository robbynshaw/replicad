import React from "react";

import {
  Canvas,
  Controls,
  DefaultGeometry,
  InfiniteGrid,
  Material,
  ShapeGeometries,
} from "replicad-react";

export default React.memo(function PresentationViewer({
  shapes,
  disableAutoPosition = false,
  disableDamping = false,
  hideGrid = false,
}) {
  const geometryReady = shapes && shapes.length && shapes[0].name;

  return (
    <Canvas>
      {!hideGrid && <InfiniteGrid />}
      <Controls hideGizmo={!geometryReady} enableDamping={!disableDamping}>
        {shapes !== "error" && shapes.length && (
          <ShapeGeometries
            shapes={shapes}
            selectMode="none"
            disableAutoPosition={disableAutoPosition}
            FaceMaterial={Material}
          />
        )}
        {shapes === "error" && <DefaultGeometry />}
      </Controls>
    </Canvas>
  );
});
