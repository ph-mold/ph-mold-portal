export const API_BASE = import.meta.env.VITE_API_URL || "";
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";

export const API = {
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
  },
  SPEC_TYPES: {
    GET_SPEC_TYPES: `${API_BASE}/admin/product-spec`,
  },
  TAGS: {
    GET_TAGS: `${API_BASE}/admin/product-tag`,
  },
  FILE: {
    UPLOAD_FILE: `${API_BASE}/file`,
  },
};
