import { IPaginated } from "@ph-mold/ph-ui";

// 라벨 타입 상수
export const LABEL_TYPES = {
  LS_3509: "ls-3509",
  LS_3510: "ls-3510",
} as const;

export type LabelType = (typeof LABEL_TYPES)[keyof typeof LABEL_TYPES];

// 3509 라벨 데이터 타입 (value1~4)
export interface LabelData3509 {
  value1: string; // 업체명
  value2: string; // 제품명
  value3: string; // 규격
  value4: string; // 수량
  backgroundColor: string;
}

// 3510 라벨 데이터 타입 (value1~6)
export interface LabelData3510 {
  value1: string; // 입고처
  value2: string; // 품명
  value3: string; // 코드
  value4: string; // 수량
  value5: string; // 중량
  value6: string; // 납품일
  backgroundColor: string;
}

// 통합 라벨 데이터 타입
export type LabelData = LabelData3509 | LabelData3510;

export interface LabelSticker {
  filename: string;
  data: (LabelData | Record<string, never>)[];
  labelType: LabelType;
}

// 라벨 스티커 이력 아이템 타입
export interface LabelStickerHistory {
  id: string;
  fileName: string;
  operator: string;
  createdAt: string;
  labelType: LabelType;
  labelData: (LabelData | Record<string, never>)[];
}

// 페이지네이션 요청 파라미터 타입
export interface LabelStickerListParams {
  page: number;
  limit: number;
}

// 라벨 스티커 목록 응답 타입
export type LabelStickerListResponse = IPaginated<LabelStickerHistory>;
