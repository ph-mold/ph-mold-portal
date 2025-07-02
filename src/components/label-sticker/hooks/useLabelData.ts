import { useState } from "react";
import {
  LabelData,
  LabelSticker,
  LabelType,
} from "../../../lib/types/label-sticker";
import { createEmptyDataArray } from "../label/utils";
import { LABEL_TYPE_CONFIGS } from "../label/constants";

interface Props {
  labelType: LabelType;
}
export function useLabelData({ labelType }: Props) {
  // 메인 라벨 스티커 데이터
  const [labelSticker, setLabelSticker] = useState<LabelSticker>({
    filename: "",
    data: createEmptyDataArray(labelType),
    labelType,
  });

  // 추가된 데이터 목록
  const [addedData, setAddedData] = useState<LabelData[]>([]);

  // 선택된 카드 인덱스
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  // 새 데이터 추가
  const handleAddData = (newData: LabelData) => {
    setAddedData([...addedData, newData]);
  };

  // 데이터 선택
  const handleSelectData = (data: LabelData, onComplete?: () => void) => {
    if (selectedCardIndex !== null) {
      const newLabelData = [...labelSticker.data];
      newLabelData[selectedCardIndex] = data;
      setLabelSticker({
        ...labelSticker,
        data: newLabelData,
      });
    }
    onComplete?.();
  };

  // 데이터 전체 초기화
  const handleClearData = (isBulk = false) => {
    if (isBulk) {
      setLabelSticker((prev) => ({
        ...prev,
        data: Array(LABEL_TYPE_CONFIGS[labelType].labelCount).fill({}),
      }));
    } else if (selectedCardIndex !== null) {
      const newData = [...labelSticker.data];
      newData[selectedCardIndex] = {};
      setLabelSticker({ ...labelSticker, data: newData });
    }
  };

  // 데이터 일괄 적용
  const handleBulkApplyData = (data: Partial<LabelData>) => {
    setLabelSticker((prev) => ({
      ...prev,
      data: Array(prev.data.length).fill(data),
    }));
  };

  return {
    labelSticker,
    setLabelSticker,
    addedData,
    setAddedData,
    selectedCardIndex,
    setSelectedCardIndex,
    handleAddData,
    handleSelectData,
    handleClearData,
    handleBulkApplyData,
    selectedData:
      selectedCardIndex !== null
        ? (labelSticker.data[selectedCardIndex] as LabelData)
        : undefined,
  };
}
