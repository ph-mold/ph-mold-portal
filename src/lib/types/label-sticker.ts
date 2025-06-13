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
