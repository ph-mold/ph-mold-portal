import { mutate } from "swr";
/**
 * 특정 패턴의 쿼리 키를 가진 캐시를 무효화하는 함수
 * @param mutate - useSWR의 mutate 함수
 * @param pattern - 쿼리 키 패턴 (예: 'GET_PRODUCTS_BY_CATEGORY_PAGINATED')
 */
export const invalidateQueryByPattern = (pattern: string) => {
  mutate((key: unknown) => Array.isArray(key) && key[0] === pattern, undefined);
};
