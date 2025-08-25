export const STATUS_MAP = {
  PENDING: {
    label: "대기중",
    color: "text-sky-600 bg-sky-100",
    borderColor: "border-sky-200",
  },
  IN_PROGRESS: {
    label: "처리중",
    color: "text-orange-600 bg-orange-100",
    borderColor: "border-orange-200",
  },
  COMPLETED: {
    label: "답변완료",
    color: "text-green-600 bg-green-100",
    borderColor: "border-green-200",
  },
} as const;
