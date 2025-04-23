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
      <h1>Electron IPC Demo</h1>
      <button onClick={saveFile}>📁 파일 저장</button>
      <button onClick={getVersion}>🔍 버전 확인</button>
      <p>버전: {version}</p>
    </div>
  );
}
