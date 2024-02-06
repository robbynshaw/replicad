import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";
import React, { ReactNode, Ref, useRef } from "react";
import Stage from "./Stage";

interface ControlsProps {
  hideGizmo: boolean;
  enableDamping: boolean;
}

const Controls = React.memo(
  React.forwardRef(function Controls(
    { hideGizmo, enableDamping }: ControlsProps,
    controlsRef: Ref<any>
  ) {
    return (
      <>
        <OrbitControls
          makeDefault
          ref={controlsRef}
          enableDamping={enableDamping}
        />
        {!hideGizmo && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport font="18px Inter var, HKGrotesk, sans-serif" />
          </GizmoHelper>
        )}
      </>
    );
  })
);

interface SceneProps {
  hideGizmo?: boolean;
  center?: boolean;
  enableDamping: boolean;
  children: ReactNode[];
}

export default React.memo(function Scene({
  hideGizmo,
  center,
  enableDamping = true,
  children,
}: SceneProps) {
  const controlsRef = useRef();

  return (
    <>
      <Controls
        hideGizmo={hideGizmo}
        ref={controlsRef}
        enableDamping={enableDamping}
      />
      <Stage constrols={controlsRef} center={center}>
        {children}
      </Stage>
    </>
  );
});
