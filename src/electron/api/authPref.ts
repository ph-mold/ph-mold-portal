import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("get-auth-access-token", () => {
  return store.get("auth.access-token");
});

ipcMain.handle("save-auth-access-token", (_e, token: string) => {
  store.set("auth.access-token", token);
});

ipcMain.handle("get-auth-refresh-token", () => {
  return store.get("auth.refresh-token");
});

ipcMain.handle("save-auth-refresh-token", (_e, token: string) => {
  store.set("auth.refresh-token", token);
});

ipcMain.handle("clear-auth-token", () => {
  store.delete("auth.access-token");
  store.delete("auth.refresh-token");
});
