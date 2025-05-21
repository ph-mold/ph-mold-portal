import { API } from "../constants/api";
import { isElectron } from "../electron/isElectron";
import { ILoginBody } from "../types/auth";

export const POST_LOGIN = "postLogin";
export async function postLogin(data: ILoginBody) {
  const response = await fetch(`${API.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      platform: isElectron ? "desktop" : "web",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  return await response.json();
}
