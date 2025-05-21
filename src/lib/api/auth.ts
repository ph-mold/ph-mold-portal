import { API } from "../constants/api";
import { ILoginBody } from "../types/auth";

export const POST_LOGIN = "postLogin";
export async function postLogin(data: ILoginBody) {
  const response = await fetch(`${API.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // throw new Error("제품 정보 수정에 실패했습니다.");
  }
}
