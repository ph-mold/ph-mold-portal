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
