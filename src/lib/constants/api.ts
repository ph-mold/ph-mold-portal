export const API_BASE = import.meta.env.VITE_API_BASE || "";

export const API = {
  CATEGORIES: {
    GET: `${API_BASE}/categories`,
    GET_BY_PARENT_KEY: (key: string) => `${API_BASE}/categories/${key}`,
  },
};
