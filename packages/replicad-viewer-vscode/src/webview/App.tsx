import { useEffect, useState } from "react";
import { EditorViewer } from "replicad-react";
import api from "./builder.worker";

export interface AppAPI {
  setCode: (code: string) => void;
}

interface Props {
  initialCode?: string;
  onApiCreated?: (api: AppAPI) => void;
}

function App(props: Props) {
  const { initialCode: codeInput, onApiCreated } = props;
  const defaultCode = `const main = () => {
    return [];
  };`;

  const [code, setCode] = useState<string>(codeInput ?? defaultCode);
  // const [shape, setShape] = useState<ShapeInterface[] | ErrorResult>([]);
  const [shape, setShape] = useState<any>([]);

  useEffect(() => {
    const appApi: AppAPI = {
      setCode: (code: string) => setCode(code),
    };

    if (onApiCreated) {
      onApiCreated(appApi);
    }
  }, []);

  useEffect(() => {
    const exec = async () => {
      const result = await api.buildShapesFromCode(code, null);
      setShape(result);
    };
    exec();
  }, [code]);

  return (
    <>
      <EditorViewer shape={shape} />
    </>
  );
}

export default App;
