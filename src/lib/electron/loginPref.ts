const isElectron = typeof window !== "undefined" && !!window.electronAPI;

const STORAGE_KEY = "login.id";

export const saveLoginId = async (id: string) => {
  if (isElectron) {
    await window.electronAPI.loginPref.saveLoginId(id);
  } else {
    localStorage.setItem(STORAGE_KEY, id);
  }
};

export const getSavedLoginId = async (): Promise<string | undefined> => {
  if (isElectron) {
    return await window.electronAPI.loginPref.getSavedLoginId();
  } else {
    return localStorage.getItem(STORAGE_KEY) || undefined;
  }
};

export const clearLoginId = async () => {
  if (isElectron) {
    await window.electronAPI.loginPref.clearLoginId();
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};
