import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CanceledError,
} from "axios";
import {
  clearToken,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "./electron/authPref";
import { isElectron } from "./electron/isElectron";
import { postRefresh } from "./api/auth";

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | undefined = undefined;

type QueuedRequest = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: RetryRequestConfig;
};
const failedQueue: QueuedRequest[] = [];
function processQueue(error: unknown, token?: string) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      resolve(instance(config));
    } else {
      reject(error);
    }
  });
  failedQueue.length = 0;
}

const instance: AxiosInstance = axios.create({
  baseURL: "",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

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

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();

        const { accessToken: newAT, refreshToken: newRT } = await postRefresh(
          isElectron ? { refresh_token: refreshToken } : undefined
        );
        await saveAccessToken(newAT);
        if (isElectron && newRT) await saveRefreshToken(newRT);
        return newAT as string;
      })();

      try {
        const newToken = await refreshPromise;
        processQueue(null, newToken);
        return instance(originalRequest);
      } catch (refreshError) {
        const err = refreshError as AxiosError;
        const refreshStatus = err?.response?.status;

        if (refreshStatus === 401 || refreshStatus === 403) {
          processQueue(err);
          await clearToken();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = undefined;
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: originalRequest });
    });
  }
);

export function isCanceled(err: unknown): err is CanceledError<unknown> {
  return (
    axios.isCancel(err) ||
    (typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "ERR_CANCELED")
  );
}

export const axiosInstance = instance;
