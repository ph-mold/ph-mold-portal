import { isElectron } from "./isElectron";

const STORAGE_KEY = "login.email";

export const saveLoginEmail = async (email: string) => {
  if (isElectron) {
    await window.electronAPI.loginPref.saveLoginEmail(email);
  } else {
    localStorage.setItem(STORAGE_KEY, email);
  }
};

export const getSavedLoginEmail = async (): Promise<string | undefined> => {
  if (isElectron) {
    return await window.electronAPI.loginPref.getSavedLoginEmail();
  } else {
    return localStorage.getItem(STORAGE_KEY) || undefined;
  }
};

export const clearLoginEmail = async () => {
  if (isElectron) {
    await window.electronAPI.loginPref.clearLoginEmail();
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};
