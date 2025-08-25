import { axiosInstance } from "../axiosInstance";
import { API } from "../constants/api";
import {
  IInquiriesParams,
  IInquiriesResponse,
  IInquiry,
  InquiryStatus,
} from "../types/inquiry";

export const GET_INQUIRIES_PAGINATED = "getInquiriesPaginated";
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
export async function getInquiryById(
  id?: string
): Promise<IInquiry | undefined> {
  if (!id) return;
  const res = await axiosInstance.get<IInquiry>(API.INQUIRY.GET_ONE_BY_ID(id));
  return res.data;
}

export const PATCH_INQUIRY_STATUS = "patchInquiryStatus";
export async function patchInquiryStatus(id: string, status: InquiryStatus) {
  await axiosInstance.patch(API.INQUIRY.PATCH_STATUS(id), { status });
}

export const POST_INQUIRY_REPLY = "postInquiryReply";
export async function postInquiryReply(id: string, content: string) {
  await axiosInstance.post(API.INQUIRY.POST_REPLY(id), { content });
}
