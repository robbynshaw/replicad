import { useEffect, useState } from "react";
import { EditorViewer } from "replicad-react";
import api from "./builder.worker";

function App() {
  // const [shape, setShape] = useState<ShapeInterface[] | ErrorResult>([]);
  const [shape, setShape] = useState<any>([]);

  const code = `const { drawEllipse } = replicad;
  const main = () => {
    return drawEllipse(20, 30).sketchOnPlane().extrude(50).fillet(2);
  };`;
  useEffect(() => {
    const exec = async () => {
      const result = await api.buildShapesFromCode(code, null);
      setShape(result);
    };
    exec();
  }, []);

  return (
    <>
      <EditorViewer shape={shape} />
    </>
  );
}

export default App;
