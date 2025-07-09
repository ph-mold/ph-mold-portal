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

export const CREATE_SPEC_TYPE = "createSpecType";
export const createSpecType = async (specType: ISpecType) => {
  const response = await axiosInstance.post(
    API.SPEC_TYPES.CREATE_SPEC_TYPE,
    specType
  );
  return response.data;
};

export const UPDATE_SPEC_TYPE = "updateSpecType";
export const updateSpecType = async ({ id, ...specType }: ISpecType) => {
  const response = await axiosInstance.patch(
    API.SPEC_TYPES.UPDATE_SPEC_TYPE(id),
    specType
  );
  return response.data;
};

export const DELETE_SPEC_TYPE = "deleteSpecType";
export const deleteSpecType = async (id: number) => {
  const response = await axiosInstance.delete(
    API.SPEC_TYPES.DELETE_SPEC_TYPE(id)
  );
  return response.data;
};
