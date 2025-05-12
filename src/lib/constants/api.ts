export const API_BASE = import.meta.env.VITE_API_URL || "";

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
  },
  SPEC_TYPES: {
    GET_SPEC_TYPES: `${API_BASE}/admin/product-spec`,
  },
};
