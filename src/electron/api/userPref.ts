import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("get-login-email", () => {
  return store.get("login.email");
});

ipcMain.handle("save-login-email", (_e, email: string) => {
  store.set("login.email", email);
});

ipcMain.handle("clear-login-email", () => {
  store.delete("login.email");
});
