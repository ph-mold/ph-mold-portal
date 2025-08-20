import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import {
  IInquiriesParams,
  IInquiriesResponse,
  IInquiry,
} from "../types/inquiry";

export const GET_INQUIRIES = "getInquiries";
export async function getInquiriesWithPagination(
  params: IInquiriesParams
): Promise<IInquiriesResponse> {
  const res = await axiosInstance.get<IInquiriesResponse>(
    API.INQUIRY.GET_PAGINATED,
    { params }
  );
  return res.data;
}

export const GET_INQUIRY_BY_ID = "getInquiryById";
export async function getInquiryById(id: number): Promise<IInquiry> {
  const res = await axiosInstance.get<IInquiry>(API.INQUIRY.GET_ONE_BY_ID(id));
  return res.data;
}
