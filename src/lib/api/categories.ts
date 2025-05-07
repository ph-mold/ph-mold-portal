import { IGetCategory } from "../../types/category";
import { API } from "../constants/api";
import { fetcher } from "../fetcher";

export async function getRootCategory(): Promise<IGetCategory[]> {
  return (await fetcher(API.CATEGORIES.GET, { cache: "force-cache" })) ?? [];
}
