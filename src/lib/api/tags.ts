import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { ITag, ITagListParams } from "../types/tag";

export const GET_TAGS = "getTags";
export const GET_TAG = "getTag";
export const CREATE_TAG = "createTag";
export const UPDATE_TAG = "updateTag";
export const DELETE_TAG = "deleteTag";

export async function getTags(): Promise<ITag[]> {
  try {
    const response = await axiosInstance.get<ITag[]>(API.TAGS.GET_TAGS);
    return response.data;
  } catch (error) {
    console.error("태그 목록 불러오기 실패:", error);
    throw new Error("태그 정보를 가져오는 데 실패했습니다.");
  }
}

export const GET_TAGS_PAGINATED = "getTagsPaginated";
export const getTagsPaginated = async (params: ITagListParams) => {
  const response = await axiosInstance.get(API.TAGS.GET_TAGS_PAGINATED, {
    params,
  });
  return response.data;
};

export async function getTag(id: number): Promise<ITag> {
  try {
    const response = await axiosInstance.get<ITag>(
      `${API.TAGS.GET_TAGS}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("태그 정보 불러오기 실패:", error);
    throw new Error("태그 정보를 가져오는 데 실패했습니다.");
  }
}

export async function createTag(data: ITag): Promise<ITag> {
  try {
    const response = await axiosInstance.post<ITag>(API.TAGS.GET_TAGS, data);
    return response.data;
  } catch (error) {
    console.error("태그 생성 실패:", error);
    throw new Error("태그를 생성하는 데 실패했습니다.");
  }
}

export async function updateTag({ id, ...tag }: ITag): Promise<ITag> {
  try {
    const response = await axiosInstance.patch<ITag>(
      `${API.TAGS.GET_TAGS}/${id}`,
      tag
    );
    return response.data;
  } catch (error) {
    console.error("태그 수정 실패:", error);
    throw new Error("태그를 수정하는 데 실패했습니다.");
  }
}

export async function deleteTag(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`${API.TAGS.GET_TAGS}/${id}`);
  } catch (error) {
    console.error("태그 삭제 실패:", error);
    throw new Error("태그를 삭제하는 데 실패했습니다.");
  }
}
