import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import {
  GetSampleRequestsDto,
  IGetSampleRequestListResponse,
  IProcessingNodeBody,
  ISampleRequest,
} from "../types/sample-request";

export const GET_SAMPLE_REQUESTS = "getSampleRequests";
export async function getSampleRequests(): Promise<ISampleRequest[]> {
  const response = await axiosInstance.get<ISampleRequest[]>(
    API.SAMPLE_REQUESTS.GET
  );
  return response.data;
}

export const GET_SAMPLE_REQUESTS_PAGINATED = "getSampleRequestsPaginated";
export async function getSampleRequestsPaginated(
  params: GetSampleRequestsDto
): Promise<IGetSampleRequestListResponse> {
  const response = await axiosInstance.get<IGetSampleRequestListResponse>(
    API.SAMPLE_REQUESTS.GET_PAGINATED,
    {
      params,
    }
  );
  return response.data;
}

export const GET_SAMPLE_REQUEST = "getSampleRequest";
export async function getSampleRequest(
  id?: string
): Promise<ISampleRequest | undefined> {
  if (!id) return;
  const res = await axiosInstance.get<ISampleRequest>(
    API.SAMPLE_REQUESTS.GET_ONE(parseInt(id))
  );
  return res.data;
}

export const UPDATE_RECEPTION_NODE = "updateReceptionNode";
export async function updateReceptionNode(
  id: number
): Promise<ISampleRequest | undefined> {
  const res = await axiosInstance.post<ISampleRequest>(
    API.SAMPLE_REQUESTS.UPDATE_RECEPTION_NODE(id)
  );
  return res.data;
}

export const UPDATE_PROCESSING_NODE = "updateProcessingNode";
export async function updateProcessingNode(
  id: number,
  data: IProcessingNodeBody
): Promise<ISampleRequest | undefined> {
  const res = await axiosInstance.post<ISampleRequest>(
    API.SAMPLE_REQUESTS.UPDATE_PROCESSING_NODE(id),
    data
  );
  return res.data;
}
