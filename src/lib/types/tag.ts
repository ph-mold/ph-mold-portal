import { IPaginated } from "@ph-mold/ph-ui";
import { ChangeFlag } from "./product";

export interface ITag {
  id: number;
  key: string;
  name: string;
  flag?: ChangeFlag;
}

export interface ITagListParams {
  page: number;
  limit: number;
}

export type ITagListResponse = IPaginated<ITag>;
