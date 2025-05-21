/// <reference types="vite/client" />
interface Window {
  electronAPI: {
    saveFile: (name: string, content: string) => Promise<void>;
    getAppVersion: () => Promise<string>;
    loginPref: {
      saveLoginEmail(id: string): Promise<void>;
      getSavedLoginEmail(): Promise<string | undefined>;
      clearLoginEmail(): Promise<void>;
    };
  };
}
