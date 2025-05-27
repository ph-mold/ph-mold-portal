import { API } from "../constants/api";
import { ILoginBody, ILoginData, IRefreshBody, IUser } from "../types/auth";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";
import { isElectron } from "../electron/isElectron";

export const POST_LOGIN = "postLogin";

export async function postLogin(body: ILoginBody): Promise<ILoginData> {
  const { data } = await axiosInstance.post(API.AUTH.LOGIN, body, {
    withCredentials: true,
  });

  return data;
}

export const POST_LOGOUT = "postLogout";
export async function postLogout() {
  const { data } = await axiosInstance.post(API.AUTH.LOGOUT, {
    withCredentials: true,
  });
  return data;
}

export const POST_REFRESH = "postRefresh";
export async function postRefresh(body?: IRefreshBody) {
  const { data } = await axios.post(API.AUTH.REFRESH, body, {
    withCredentials: true,
    headers: { platform: isElectron ? "desktop" : "web" },
  });

  return data;
}

export const GET_ME = "getMe";
export async function getMe() {
  const res = await axiosInstance.get<IUser>(API.USER.ME);
  return res.data;
}
