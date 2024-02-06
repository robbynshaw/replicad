import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Suspense } from "react";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen.js";

const StyledCanvas = styled(ThreeCanvas)`
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
`;

export default function Canvas({ children, ...props }) {
  const dpr = Math.min(window.devicePixelRatio, 2);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <StyledCanvas dpr={dpr} frameloop="demand" {...props}>
        {children}
      </StyledCanvas>
    </Suspense>
  );
}
