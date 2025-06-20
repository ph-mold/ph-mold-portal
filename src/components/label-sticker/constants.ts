// 라벨 타입별 설정
export interface LabelTypeConfig {
  type: "ls-3509" | "ls-3510";
  labelCount: number;
  valueCount: number;
  titles: Record<string, string>;
  aspectRatio: string;
}

export const LABEL_TYPE_CONFIGS: Record<string, LabelTypeConfig> = {
  "ls-3509": {
    type: "ls-3509",
    labelCount: 18,
    valueCount: 4,
    titles: {
      value1: "업체명",
      value2: "제품명",
      value3: "규격",
      value4: "수량",
    },
    aspectRatio: "3/1",
  },
  "ls-3510": {
    type: "ls-3510",
    labelCount: 10,
    valueCount: 6,
    titles: {
      value1: "입고처",
      value2: "품명",
      value3: "코드",
      value4: "수량",
      value5: "중량",
      value6: "납품일",
    },
    aspectRatio: "7/4",
  },
};

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
