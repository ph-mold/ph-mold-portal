import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (name: string, content: string) =>
    ipcRenderer.invoke("save-file", { name, content }),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  loginPref: {
    getSavedLoginEmail: () => ipcRenderer.invoke("get-login-email"),
    saveLoginEmail: (email: string) =>
      ipcRenderer.invoke("save-login-email", email),
    clearLoginEmail: () => ipcRenderer.invoke("clear-login-email"),
  },
  authPref: {
    getAccessToken: () => ipcRenderer.invoke("get-auth-access-token"),
    saveAccessToken: (token: string) =>
      ipcRenderer.invoke("save-auth-access-token", token),
    getRefreshToken: () => ipcRenderer.invoke("get-auth-refresh-token"),
    saveRefreshToken: (token: string) =>
      ipcRenderer.invoke("save-auth-refresh-token", token),
    clearToken: () => ipcRenderer.invoke("clear-auth-token"),
  },
});
