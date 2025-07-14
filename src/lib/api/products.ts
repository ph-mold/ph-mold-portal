import { API } from "../constants/api";
import {
  IGetProduct,
  IGetProductImage,
  IGetProductInfo,
  IGetProductListResponse,
} from "../types/product";
import { axiosInstance } from "../axiosInstance";

// GET: 카테고리별 제품 목록
export const GET_PRODUCTS_BY_CATEGORY = "getProductsByCategory";
export async function getProductsByCategory(
  category: string
): Promise<IGetProduct[]> {
  const res = await axiosInstance.get<IGetProduct[]>(
    API.PRODUCTS.GET_BY_CATEGORY(category)
  );
  return res.data;
}

export const GET_PRODUCTS_BY_CATEGORY_PAGINATED =
  "getProductsByCategoryPaginated";
export async function getProductsByCategoryPaginated(
  category: string,
  page?: number,
  limit?: number
): Promise<IGetProductListResponse> {
  const res = await axiosInstance.get<IGetProductListResponse>(
    API.PRODUCTS.GET_BY_CATEGORY_PAGINATED,
    {
      params: {
        category,
        page,
        limit,
      },
    }
  );
  return res.data;
}

// GET: 제품 상세 정보
export const GET_PRODUCT_INFO_BY_KEY = "getProductInfoByKey";
export async function getProductInfoByKey(
  key?: string
): Promise<IGetProductInfo | undefined> {
  if (!key) return;
  const res = await axiosInstance.get<IGetProductInfo>(
    API.PRODUCTS.GET_ONE_BY_PRODUCT_KEY(key)
  );
  return res.data;
}

// GET: 제품 이미지
export const GET_PRODUCT_IMAGES_BY_KEY = "getProductImagesByKey";
export async function getProductImagesByKey(
  key?: string
): Promise<IGetProductImage[] | undefined> {
  if (!key) return;
  const res = await axiosInstance.get<IGetProductImage[]>(
    API.PRODUCTS.GET_IMAGES_BY_KEY(key)
  );
  return res.data;
}

// PATCH: 제품 수정
export const PATCH_PRODUCT = "patchProduct";
export async function patchProduct(productId: number, data: IGetProductInfo) {
  await axiosInstance.patch(API.PRODUCTS.PATCH_PRODUCT(productId), data);
}
