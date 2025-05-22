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
    authPref: {
      saveAccessToken(token: string): Promise<void>;
      saveRefreshToken(token: string): Promise<void>;
      getAccessToken(): Promise<string | undefined>;
      getRefreshToken(): Promise<string | undefined>;
      clearToken(): Promise<void>;
    };
  };
}
