export const API_BASE = import.meta.env.VITE_API_URL || "";
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";

export const API = {
  USER: {
    ME: `${API_BASE}/user/me`,
  },
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REFRESH: `${API_BASE}/auth/refresh`,
    LOGOUT: `${API_BASE}/auth/logout`,
  },
  CATEGORIES: {
    GET: `${API_BASE}/categories`,
    GET_BY_PARENT_KEY: (key: string) => `${API_BASE}/categories/${key}`,
  },
  PRODUCTS: {
    GET_BY_CATEGORY: (category: string) =>
      `${API_BASE}/products?category=${category}`,
    GET_ONE_BY_PRODUCT_KEY: (productKey: string) =>
      `${API_BASE}/products/${productKey}/info`,
    GET_IMAGES_BY_KEY: (key: string) => `${API_BASE}/products/${key}/images`,
    PATCH_PRODUCT: (productId: number) =>
      `${API_BASE}/admin/products/${productId}`,
  },
  SPEC_TYPES: {
    GET_SPEC_TYPES: `${API_BASE}/admin/spec`,
  },
  TAGS: {
    GET_TAGS: `${API_BASE}/admin/tag`,
  },
  SAMPLE_REQUESTS: {
    GET: `${API_BASE}/admin/sample-request`,
    GET_ONE: (id: number) => `${API_BASE}/admin/sample-request/${id}`,
  },
  FILE: {
    UPLOAD_FILE: `${API_BASE}/file`,
  },
  LABEL_STICKER: {
    GET_HISTORIES: `${API_BASE}/admin/label-sticker/histories`,
    LS_3510: `${API_BASE}/admin/label-sticker/ls-3510`,
    LS_3510_REGENERATE: `${API_BASE}/admin/label-sticker/ls-3510/regenerate`,
  },
};
