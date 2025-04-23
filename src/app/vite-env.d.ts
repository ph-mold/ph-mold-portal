/// <reference types="vite/client" />
interface Window {
  electronAPI: {
    saveFile: (name: string, content: string) => Promise<void>;
    getAppVersion: () => Promise<string>;
  };
}
