import { API } from "../constants/api";
import { ILoginBody } from "../types/auth";
import { axiosInstance } from "../axiosInstance";

export const POST_LOGIN = "postLogin";

export async function postLogin(data: ILoginBody) {
  try {
    const response = await axiosInstance.post(`${API.AUTH.LOGIN}`, data);

    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인 실패");
  }
}

export const POST_LOGOUT = "postLogout";
export async function postLogout() {
  try {
    const response = await axiosInstance.post(`${API.AUTH.LOGOUT}`);

    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw new Error("로그아웃 실패");
  }
}
