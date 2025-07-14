import { IPaginated } from "@ph-mold/ph-ui";
import { IGetProduct } from "./product";

export interface ISampleRequest {
  id: number;
  product: IGetProduct;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  detailedAddress: string;
  quantity: number;
  agree: boolean;
  remarks: string;
  createdAt: Date;
}

export interface GetSampleRequestsDto {
  page?: number;
  limit?: number;
}

export type IGetSampleRequestListResponse = IPaginated<ISampleRequest>;
