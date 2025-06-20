import { useState } from "react";
import {
  LabelData,
  LabelSticker,
  LabelType,
} from "../../../lib/types/label-sticker";
import { createEmptyDataArray, createInitialData } from "../utils";

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

  // 새로운 데이터 입력을 위한 상태
  const [newData, setNewData] = useState<LabelData>(
    createInitialData(labelType)
  );

  // 추가된 데이터 목록
  const [addedData, setAddedData] = useState<LabelData[]>([]);

  // 선택된 카드 인덱스
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  // 새 데이터 추가
  const handleAddData = (onComplete?: () => void) => {
    setAddedData([...addedData, newData]);
    setNewData(createInitialData(labelType));
    onComplete?.();
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

  // 선택된 데이터 비우기
  const handleClearData = () => {
    if (selectedCardIndex !== null) {
      const newLabelData = [...labelSticker.data];
      newLabelData[selectedCardIndex] = {};
      setLabelSticker({
        ...labelSticker,
        data: newLabelData,
      });
    }
  };

  return {
    labelSticker,
    setLabelSticker,
    newData,
    setNewData,
    addedData,
    setAddedData,
    selectedCardIndex,
    setSelectedCardIndex,
    handleAddData,
    handleSelectData,
    handleClearData,
    selectedData:
      selectedCardIndex !== null
        ? (labelSticker.data[selectedCardIndex] as LabelData)
        : undefined,
  };
}
