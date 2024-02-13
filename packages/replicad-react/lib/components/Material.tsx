import { useTexture } from "@react-three/drei";

export default function Material(props) {
  const [matcap1] = useTexture([
    globalThis.REPLICAD_CONFIG?.materialUri ?? "/textures/matcap-1.png",
  ]);
  return <meshMatcapMaterial color="#5a8296" matcap={matcap1} {...props} />;
}
