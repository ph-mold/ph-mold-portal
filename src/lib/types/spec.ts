import { IPaginated } from "@ph-mold/ph-ui";

export interface ISpecType {
  id: number;
  key: string;
  label: string;
  unit: string;
}

export interface ISpecTypeListParams {
  page: number;
  limit: number;
}

export type ISpecTypeListResponse = IPaginated<ISpecType>;
