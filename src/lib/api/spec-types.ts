import { API } from "../constants/api";
import { fetcher } from "../fetcher";
import { ISpecType } from "../types/product";

export const GET_SPEC_TYPES = "getSpecTypes";
export async function getSpecTypes(): Promise<ISpecType[]> {
  return (await fetcher(API.SPEC_TYPES.GET_SPEC_TYPES)) ?? [];
}
