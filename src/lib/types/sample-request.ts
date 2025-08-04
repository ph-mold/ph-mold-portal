import { IPaginated } from "@ph-mold/ph-ui";
import { IGetProduct } from "./product";

export type SampleRequestStatus =
  | "reception"
  | "processing"
  | "shipped"
  | "completed";

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
  status: string; // 콤마로 구분된 완료된 상태들
  assignedUserId?: number;
  completedAt?: Date;
  trackingCode?: string;
  nodeData?: IProcessNodeData;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProcessNodeData {
  processing: IProcessingNodeBody & IProcessSign;
  shipped: IShippedNodeBody & IProcessSign;
}

export interface IProcessSign {
  date?: string; // Date를 string으로 변경
  operator?: string;
}

// 완료된 상태들을 배열로 반환하는 유틸리티 함수
export const getCompletedStatuses = (status: string): SampleRequestStatus[] => {
  return status.split(",").filter(Boolean) as SampleRequestStatus[];
};

// 특정 상태가 완료되었는지 확인하는 유틸리티 함수
export const isStatusCompleted = (
  status: string,
  targetStatus: SampleRequestStatus
): boolean => {
  return getCompletedStatuses(status).includes(targetStatus);
};

// 현재 진행 중인 상태 반환하는 유틸리티 함수
export const getCurrentStatus = (status: string): SampleRequestStatus => {
  const completedStatuses = getCompletedStatuses(status);
  const allStatuses: SampleRequestStatus[] = [
    "reception",
    "processing",
    "shipped",
    "completed",
  ];

  if (completedStatuses.length === 0) return "reception";
  if (completedStatuses.includes("completed")) return "completed";

  const lastCompletedIndex = allStatuses.indexOf(
    completedStatuses[completedStatuses.length - 1]
  );
  const nextIndex = lastCompletedIndex + 1;

  return allStatuses[nextIndex] || "completed";
};

export interface GetSampleRequestsDto {
  page?: number;
  limit?: number;
}

export type IGetSampleRequestListResponse = IPaginated<ISampleRequest>;

export interface IProcessingNodeBody {
  memo?: string;
  imageUrl?: string;
}

export interface IShippedNodeBody {
  trackingNumber: string;
  shippedAt: string;
  memo?: string;
}
