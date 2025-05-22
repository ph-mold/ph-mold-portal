import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  clearToken,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "./electron/authPref";
import { isElectron } from "./electron/isElectron";
import { API } from "./constants/api";

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const instance: AxiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken 자동 삽입
instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers?.set?.("Authorization", `Bearer ${token}`);
    }
    config.headers?.set?.("platform", isElectron ? "desktop" : "web");
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await getRefreshToken();

        const res = await axios.post(
          API.AUTH.REFRESH,
          isElectron ? { refresh_token: refreshToken } : undefined,
          {
            headers: {
              platform: isElectron ? "desktop" : "web",
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = res.data.accessToken;
        await saveAccessToken(newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return instance(originalRequest);
      } catch (refreshError: unknown) {
        const err = refreshError as AxiosError;
        const refreshStatus = err?.response?.status;

        if (refreshStatus === 401 || refreshStatus === 403) {
          await clearToken();
          window.location.href = "#/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export const axiosInstance = instance;
