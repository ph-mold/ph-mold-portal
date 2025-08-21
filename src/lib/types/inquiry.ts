import { IPaginated } from "@ph-mold/ph-ui";

export type InquiryStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface IReply {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInquiry {
  id: number;
  status: InquiryStatus;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  detailedAddress: string;
  agree: boolean;
  remarks: string;
  password: string;
  createdAt: string;
  reply?: IReply;
}

export interface IInquiriesParams {
  page: number;
  limit: number;
}

export type IInquiriesResponse = IPaginated<IInquiry>;
