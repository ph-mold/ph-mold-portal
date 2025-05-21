import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { ITag } from "../types/product";

export const GET_TAGS = "getTags";

export async function getTags(): Promise<ITag[]> {
  try {
    const response = await axiosInstance.get<ITag[]>(API.TAGS.GET_TAGS);
    return response.data;
  } catch (error) {
    console.error("태그 목록 불러오기 실패:", error);
    throw new Error("태그 정보를 가져오는 데 실패했습니다.");
  }
}
