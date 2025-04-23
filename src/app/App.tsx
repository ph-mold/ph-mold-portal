import { Button } from "@ph-mold/ph-ui";
import { useState } from "react";

export default function App() {
  const [version, setVersion] = useState("");

  const saveFile = () => {
    window.electronAPI.saveFile("myfile.txt", "Hello, world!");
  };

  const getVersion = async () => {
    const v = await window.electronAPI.getAppVersion();
    setVersion(v);
  };

  return (
    <div>
      <h1 className="text-4xl text-signature">Electron IPC Demo</h1>
      <Button size="small" onClick={saveFile}>
        파일 저장
      </Button>
      <Button size="small" onClick={getVersion}>
        버전 확인
      </Button>
      <p>버전: {version}</p>
    </div>
  );
}
