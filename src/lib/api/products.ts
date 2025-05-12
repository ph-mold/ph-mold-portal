import { API } from "../constants/api";
import { fetcher } from "../fetcher";
import {
  IGetProduct,
  IGetProductImage,
  IGetProductInfo,
} from "../types/product";

export const GET_PRODUCTS_BY_CATEGORY = "getProductsByCategory";
export async function getProductsByCategory(
  categoryKey: string
): Promise<IGetProduct[]> {
  return (await fetcher(API.PRODUCTS.GET_BY_CATEGORY(categoryKey))) ?? [];
}

export const GET_PRODUCT_INFO_BY_KEY = "getProductInfoByKey";
export async function getProductInfoByKey(
  key?: string
): Promise<IGetProductInfo | undefined> {
  if (!key) return;
  return await fetcher(API.PRODUCTS.GET_ONE_BY_PRODUCT_KEY(key));
}

export const GET_PRODUCT_IMAGES_BY_KEY = "getProductImagesByKey";
export async function getProductImagesByKey(
  key?: string
): Promise<IGetProductImage[] | undefined> {
  if (!key) return;
  return await fetcher(API.PRODUCTS.GET_IMAGES_BY_KEY(key));
}
