import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (name: string, content: string) =>
    ipcRenderer.invoke("save-file", { name, content }),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  loginPref: {
    getSavedLoginId: () => ipcRenderer.invoke("get-login-id"),
    saveLoginId: (id: string) => ipcRenderer.invoke("save-login-id", id),
    clearLoginId: () => ipcRenderer.invoke("clear-login-id"),
  },
});
