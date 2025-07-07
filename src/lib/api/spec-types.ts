import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { ISpecType, ISpecTypeListParams } from "../types/spec";

export const GET_SPEC_TYPES = "getSpecTypes";

export async function getSpecTypes(): Promise<ISpecType[]> {
  const response = await axiosInstance.get<ISpecType[]>(
    API.SPEC_TYPES.GET_SPEC_TYPES
  );
  return response.data;
}

export const GET_SPEC_TYPES_PAGINATED = "getSpecTypesPaginated";
export const getSpecTypesPaginated = async (params: ISpecTypeListParams) => {
  const response = await axiosInstance.get(
    API.SPEC_TYPES.GET_SPEC_TYPES_PAGINATED,
    {
      params,
    }
  );
  return response.data;
};
