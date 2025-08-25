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
    GET_BY_CATEGORY_PAGINATED: `${API_BASE}/products`,
    GET_ONE_BY_PRODUCT_KEY: (productKey: string) =>
      `${API_BASE}/products/${productKey}/info`,
    GET_IMAGES_BY_KEY: (key: string) => `${API_BASE}/products/${key}/images`,
    PATCH_PRODUCT: (productId: number) =>
      `${API_BASE}/admin/products/${productId}`,
  },
  SPEC_TYPES: {
    GET_SPEC_TYPES: `${API_BASE}/admin/spec`,
    GET_SPEC_TYPES_PAGINATED: `${API_BASE}/admin/spec`,
    CREATE_SPEC_TYPE: `${API_BASE}/admin/spec`,
    UPDATE_SPEC_TYPE: (specId: number) => `${API_BASE}/admin/spec/${specId}`,
    DELETE_SPEC_TYPE: (specId: number) => `${API_BASE}/admin/spec/${specId}`,
  },
  TAGS: {
    GET_TAGS: `${API_BASE}/admin/tag`,
    GET_TAGS_PAGINATED: `${API_BASE}/admin/tag`,
  },
  SAMPLE_REQUESTS: {
    GET: `${API_BASE}/admin/sample-request`,
    GET_PAGINATED: `${API_BASE}/admin/sample-request`,
    GET_ONE: (id: number) => `${API_BASE}/admin/sample-request/${id}`,
    UPDATE_RECEPTION_NODE: (id: number) =>
      `${API_BASE}/admin/sample-request/${id}/process/reception`,
    UPDATE_PROCESSING_NODE: (id: number) =>
      `${API_BASE}/admin/sample-request/${id}/process/processing`,
    UPDATE_SHIPPED_NODE: (id: number) =>
      `${API_BASE}/admin/sample-request/${id}/process/shipped`,
    UPDATE_COMPLETED_NODE: (id: number) =>
      `${API_BASE}/admin/sample-request/${id}/process/completed`,
  },
  FILE: {
    UPLOAD_FILE: `${API_BASE}/file`,
  },
  LABEL_STICKER: {
    GET_HISTORIES: `${API_BASE}/admin/label-sticker/histories`,
    DELETE_HISTORIES: (id: string) =>
      `${API_BASE}/admin/label-sticker/histories/${id}`,
    LS_3510: `${API_BASE}/admin/label-sticker/ls-3510`,
    LS_3510_REGENERATE: `${API_BASE}/admin/label-sticker/ls-3510/regenerate`,
    LS_3509: `${API_BASE}/admin/label-sticker/ls-3509`,
    LS_3509_REGENERATE: `${API_BASE}/admin/label-sticker/ls-3509/regenerate`,
  },
  INQUIRY: {
    GET_PAGINATED: `${API_BASE}/admin/inquiry`,
    GET_ONE_BY_ID: (id: string) => `${API_BASE}/admin/inquiry/${id}`,
    PATCH_STATUS: (id: string) => `${API_BASE}/admin/inquiry/${id}/status`,
  },
};
