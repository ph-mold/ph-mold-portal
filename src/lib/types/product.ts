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
  tags: ITag[];
}

export interface ITag {
  id: number;
  key: string;
  name: string;
}
export interface IGetProductInfo extends IGetProduct {
  specs: ISpec[];
}

export interface ISpec {
  id?: number;
  value: string;
  specType: ISpecType;
}

export interface ISpecType {
  id: number;
  key: string;
  label: string;
  unit: string;
}
