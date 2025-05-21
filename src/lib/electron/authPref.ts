import { isElectron } from "./isElectron";

const ACCESS_TOKEN_KEY = "auth.access-token";

export const saveAccessToken = async (token: string) => {
  if (isElectron) {
    await window.electronAPI.authPref.saveAccessToken(token);
  } else {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (isElectron) {
    return (await window.electronAPI.authPref.getAccessToken()) ?? null;
  } else {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
};

export const saveRefreshToken = async (token: string) => {
  if (isElectron) {
    await window.electronAPI.authPref.saveRefreshToken(token);
  }
};

export const getRefreshToken = async (): Promise<string | undefined> => {
  if (isElectron) {
    return await window.electronAPI.authPref.getRefreshToken();
  }
};

export const clearToken = async () => {
  if (isElectron) {
    await window.electronAPI.authPref.clearToken();
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
