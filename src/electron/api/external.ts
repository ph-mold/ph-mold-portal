import { ipcMain, shell } from "electron";

export function registerExternalHandlers() {
  // 외부 브라우저를 여는 IPC 핸들러
  ipcMain.handle("open-external", async (event, url: string) => {
    try {
      await shell.openExternal(url);
      return { success: true };
    } catch (error) {
      console.error("Failed to open external URL:", error);
      return { success: false, error: (error as Error).message };
    }
  });
}
