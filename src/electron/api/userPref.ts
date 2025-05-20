import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("get-login-id", () => {
  return store.get("login.id");
});

ipcMain.handle("save-login-id", (_e, id: string) => {
  store.set("login.id", id);
});

ipcMain.handle("clear-login-id", () => {
  store.delete("login.id");
});
