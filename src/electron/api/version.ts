import { app, ipcMain } from "electron";

export function registerVersionHandlers() {
  ipcMain.handle("get-app-version", () => {
    return app.getVersion();
  });
}
