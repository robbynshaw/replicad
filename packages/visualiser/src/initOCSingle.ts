import opencascade from "replicad-opencascadejs/src/replicad_single.js";
import opencascadeWasm from "replicad-opencascadejs/src/replicad_single.wasm?url";

export default async () => {
  const OC = await (opencascade as any)({
    locateFile: () => opencascadeWasm,
  });

  return OC;
};
