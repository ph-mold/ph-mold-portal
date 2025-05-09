import { API } from "../constants/api";
import { fetcher } from "../fetcher";
import { IGetProduct } from "../types/product";

export const GET_PRODUCTS_BY_CATEGORY = "getProductsByCategory";
export async function getProductsByCategory(
  categoryKey: string
): Promise<IGetProduct[]> {
  return (await fetcher(API.PRODUCTS.GET_BY_CATEGORY(categoryKey))) ?? [];
}
