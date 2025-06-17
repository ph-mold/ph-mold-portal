import { IPaginated } from "@ph-mold/ph-ui";
export interface LabelData {
  value1: string; // 입고처
  value2: string; // 품명
  value3: string; // 코드
  value4: string; // 수량
  value5: string; // 중량
  value6: string; // 납품일
  backgroundColor: string;
}

export interface LabelSticker {
  filename: string;
  data: (LabelData | Record<string, never>)[];
}

export interface ColorOption {
  label: string;
  value: string;
}

export const LABEL_COLORS: ColorOption[] = [
  { label: "빨간색", value: "#ff3b3b" },
  { label: "파란색", value: "#3b82f6" },
  { label: "초록색", value: "#22c55e" },
  { label: "노란색", value: "#eab308" },
  { label: "보라색", value: "#a855f7" },
];

// 라벨 스티커 이력 아이템 타입
export interface LabelStickerHistory {
  id: string;
  fileName: string;
  operator: string;
  createdAt: string;
  labelType: string;
  labelData: (LabelData | Record<string, never>)[];
}

// 페이지네이션 요청 파라미터 타입
export interface LabelStickerListParams {
  page: number;
  limit: number;
}
// 라벨 스티커 목록 응답 타입
export type LabelStickerListResponse = IPaginated<LabelStickerHistory>;
