export interface IGetProduct {
  id: number;
  key: string;
  code: string;
  name: string;
  mainCategory: string;
  subCategory: string;
  material: string;
  createdAt: Date;
  thumbnailImageUrl: string;
  origin: string;
  moq: number;
  tags?: ITag[];
}

export interface ITag {
  id: number;
  key: string;
  name: string;
  flag?: ChangeFlag;
}
export interface IGetProductInfo extends IGetProduct {
  specs: ISpec[];
  images: IGetProductImage[];
}

export interface ISpec {
  id?: number;
  value: string;
  specType: ISpecType;
  flag?: ChangeFlag;
}

export interface ISpecType {
  id: number;
  key: string;
  label: string;
  unit: string;
}

export interface IGetProductImage {
  id?: number;
  url: string;
  isThumbnail: number;
  sortOrder: number;
  createdAt?: Date;
  flag?: ChangeFlag;
}

type ChangeFlag = "new" | "update" | "delete" | undefined;
