/// <reference types="vite/client" />
interface Window {
  electronAPI: {
    saveFile: (name: string, content: string) => Promise<void>;
    getAppVersion: () => Promise<string>;
    loginPref: {
      saveLoginId(id: string): Promise<void>;
      getSavedLoginId(): Promise<string | undefined>;
      clearLoginId(): Promise<void>;
    };
  };
}
