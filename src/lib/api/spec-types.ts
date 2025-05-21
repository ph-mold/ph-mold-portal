import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { ISpecType } from "../types/product";

export const GET_SPEC_TYPES = "getSpecTypes";

export async function getSpecTypes(): Promise<ISpecType[]> {
  const response = await axiosInstance.get<ISpecType[]>(
    API.SPEC_TYPES.GET_SPEC_TYPES
  );
  return response.data;
}
