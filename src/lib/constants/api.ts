export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API = {
  CATEGORIES: {
    GET: `${API_BASE}/categories`,
    GET_BY_PARENT_KEY: (key: string) => `${API_BASE}/categories/${key}`,
  },
};
