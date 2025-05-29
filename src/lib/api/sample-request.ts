import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import { ISampleRequest } from "../types/sample-request";

export const GET_SAMPLE_REQUESTS = "getSampleRequests";

export async function getSampleRequests(): Promise<ISampleRequest[]> {
  const response = await axiosInstance.get<ISampleRequest[]>(
    API.SAMPLE_REQUESTS.GET
  );
  return response.data;
}
