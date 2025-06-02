import { ChangeFlag } from "./product";

export interface ITag {
  id: number;
  key: string;
  name: string;
  flag?: ChangeFlag;
}

export interface CreateTagDto {
  name: string;
  key: string;
}

export interface UpdateTagDto {
  name?: string;
  key?: string;
}
