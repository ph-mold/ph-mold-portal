import { API } from "../constants/api";
import { ILoginBody, IRefreshBody, IUser } from "../types/auth";
import { axiosInstance } from "../axiosInstance";

export const POST_LOGIN = "postLogin";

export async function postLogin(data: ILoginBody) {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인 실패");
  }
}

export const POST_LOGOUT = "postLogout";
export async function postLogout() {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGOUT, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw new Error("로그아웃 실패");
  }
}

export const POST_REFRESH = "postRefresh";
export async function postRefresh(data?: IRefreshBody) {
  try {
    const response = await axiosInstance.post(API.AUTH.REFRESH, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("토큰 재발급 실패:", error);
    throw new Error("토큰 재발급 실패");
  }
}

export const GET_ME = "getMe";
export async function getMe() {
  const res = await axiosInstance.get<IUser>(API.USER.ME);
  return res.data;
}
