import { LABEL_TYPE_CONFIGS, LABEL_COLORS } from "./constants";
import { LabelData, LabelType } from "@/lib/types/label-sticker";

// 라벨 타입별 초기 데이터 생성
export const createInitialData = (labelType: LabelType): LabelData => {
  const config = LABEL_TYPE_CONFIGS[labelType];
  const initialData: Record<string, string> = {
    backgroundColor: LABEL_COLORS[0].value,
  };

  for (let i = 1; i <= config.valueCount; i++) {
    initialData[`value${i}`] = "";
  }

  return initialData as unknown as LabelData;
};

// 라벨 타입별 빈 데이터 배열 생성
export const createEmptyDataArray = (
  labelType: LabelType
): (LabelData | Record<string, never>)[] => {
  const config = LABEL_TYPE_CONFIGS[labelType];
  return Array(config.labelCount).fill({});
};
