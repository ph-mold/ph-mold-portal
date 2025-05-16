import { API } from "../constants/api";
import { fetcher } from "../fetcher";
import { ITag } from "../types/product";

export const GET_TAGS = "getTags";
export async function getTags(): Promise<ITag[]> {
  return (await fetcher(API.TAGS.GET_TAGS)) ?? [];
}
