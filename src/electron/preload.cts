import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (name: string, content: string) =>
    ipcRenderer.invoke("save-file", { name, content }),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
});
