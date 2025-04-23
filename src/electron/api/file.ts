import { ipcMain, dialog } from "electron";
import fs from "fs/promises";

export function registerFileHandlers() {
  ipcMain.handle("save-file", async (_event, { name, content }) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: name,
    });

    if (filePath) {
      await fs.writeFile(filePath, content, "utf-8");
    }
  });
}
