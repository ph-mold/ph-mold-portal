import { useHeader } from "../../../../hooks/useHeader";
import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { useState } from "react";
import {
  LabelData,
  LabelSticker,
  LABEL_COLORS,
} from "../../../../lib/types/label-sticker";
import { postLS3510PDF } from "../../../../lib/api/label-sticker";

export default function LS3510Page() {
  useHeader({
    title: "LS-3510 라벨 생성",
    prevLink: "/erp",
  });

  // 라벨 데이터 상태
  const [labelSticker, setLabelSticker] = useState<LabelSticker>({
    filename: "",
    data: Array(10).fill({}),
  });

  // 새 데이터 입력을 위한 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newData, setNewData] = useState<LabelData>({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    backgroundColor: LABEL_COLORS[0].value,
  });

  // 데이터 선택 모달 상태
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [addedData, setAddedData] = useState<LabelData[]>([]);

  // PDF 생성 상태
  const [isGenerating, setIsGenerating] = useState(false);

  // 새 데이터 추가
  const handleAddData = () => {
    setAddedData([...addedData, newData]);
    setNewData({
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      backgroundColor: LABEL_COLORS[0].value,
    });
    setIsAddModalOpen(false);
  };

  // 카드 클릭 처리
  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setIsSelectModalOpen(true);
  };

  // 데이터 선택 처리
  const handleSelectData = (data: LabelData) => {
    if (selectedCardIndex !== null) {
      const newData = [...labelSticker.data];
      newData[selectedCardIndex] = data;
      setLabelSticker({
        ...labelSticker,
        data: newData,
      });
    }
    setIsSelectModalOpen(false);
  };

  // PDF 생성 및 다운로드
  const handleGeneratePDF = async () => {
    if (!labelSticker.filename) {
      alert("파일명을 입력해주세요.");
      return;
    }

    try {
      setIsGenerating(true);
      const pdfBlob = await postLS3510PDF(labelSticker);

      // PDF 다운로드
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${labelSticker.filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("PDF 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <Input
          placeholder="파일명 입력"
          value={labelSticker.filename}
          onChange={(e) =>
            setLabelSticker({ ...labelSticker, filename: e.target.value })
          }
        />
        <Button onClick={() => setIsAddModalOpen(true)}>데이터 추가</Button>
        <Button onClick={handleGeneratePDF} disabled={isGenerating}>
          {isGenerating ? "생성 중..." : "PDF 생성"}
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-10 h-[90%] max-w-[90%]">
          {/* 왼쪽 5개 라벨 */}
          <div className="flex-1">
            <div className="h-full grid grid-rows-5 gap-4">
              {labelSticker.data.map(
                (data, index) =>
                  index % 2 === 0 && (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-colors h-full"
                      style={{
                        backgroundColor:
                          "value1" in data
                            ? (data as LabelData).backgroundColor
                            : "white",
                      }}
                    >
                      <div className="h-full aspect-[9/5]">
                        <div className="p-4 h-full flex flex-col">
                          {"value1" in data ? (
                            <>
                              <div className="font-medium">
                                {(data as LabelData).value1}
                              </div>
                              <div>{(data as LabelData).value2}</div>
                              <div>{(data as LabelData).value3}</div>
                              <div className="mt-auto">
                                <div>{(data as LabelData).value4}</div>
                                <div>{(data as LabelData).value5}</div>
                                <div>{(data as LabelData).value6}</div>
                              </div>
                            </>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                              클릭하여 데이터 선택
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* 오른쪽 5개 라벨 */}
          <div className="flex-1">
            <div className="h-full grid grid-rows-5 gap-4">
              {labelSticker.data.map(
                (data, index) =>
                  index % 2 === 1 && (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-colors h-full"
                      style={{
                        backgroundColor:
                          "value1" in data
                            ? (data as LabelData).backgroundColor
                            : "white",
                      }}
                    >
                      <div className="h-full aspect-[9/5]">
                        <div className="p-4 h-full flex flex-col">
                          {"value1" in data ? (
                            <>
                              <div className="font-medium">
                                {(data as LabelData).value1}
                              </div>
                              <div>{(data as LabelData).value2}</div>
                              <div>{(data as LabelData).value3}</div>
                              <div className="mt-auto">
                                <div>{(data as LabelData).value4}</div>
                                <div>{(data as LabelData).value5}</div>
                                <div>{(data as LabelData).value6}</div>
                              </div>
                            </>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                              클릭하여 데이터 선택
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 추가 모달 */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="라벨 데이터 추가"
      >
        <div className="space-y-4">
          <Input
            label="입고처"
            value={newData.value1}
            onChange={(e) => setNewData({ ...newData, value1: e.target.value })}
          />
          <Input
            label="품명"
            value={newData.value2}
            onChange={(e) => setNewData({ ...newData, value2: e.target.value })}
          />
          <Input
            label="코드"
            value={newData.value3}
            onChange={(e) => setNewData({ ...newData, value3: e.target.value })}
          />
          <Input
            label="수량"
            value={newData.value4}
            onChange={(e) => setNewData({ ...newData, value4: e.target.value })}
          />
          <Input
            label="중량"
            value={newData.value5}
            onChange={(e) => setNewData({ ...newData, value5: e.target.value })}
          />
          <Input
            label="납품일"
            type="date"
            value={newData.value6}
            onChange={(e) => setNewData({ ...newData, value6: e.target.value })}
          />
          <div>
            <div className="mb-2">배경색</div>
            <div className="flex gap-4 flex-wrap">
              {LABEL_COLORS.map((color) => (
                <label
                  key={color.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="backgroundColor"
                    value={color.value}
                    checked={newData.backgroundColor === color.value}
                    onChange={(e) =>
                      setNewData({
                        ...newData,
                        backgroundColor: e.target.value,
                      })
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      newData.backgroundColor === color.value
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  <span>{color.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="text" onClick={() => setIsAddModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddData}>추가</Button>
          </div>
        </div>
      </Modal>

      {/* 데이터 선택 모달 */}
      <Modal
        open={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        title="데이터 선택"
      >
        <div className="space-y-4">
          {addedData.length > 0 ? (
            addedData.map((data, index) => (
              <div
                key={index}
                onClick={() => handleSelectData(data)}
                className="p-4 border rounded-lg cursor-pointer hover:border-primary"
                style={{ backgroundColor: data.backgroundColor }}
              >
                <div className="font-medium">{data.value1}</div>
                <div>{data.value2}</div>
                <div>{data.value3}</div>
                <div>{data.value4}</div>
                <div>{data.value5}</div>
                <div>{data.value6}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              추가된 데이터가 없습니다
            </div>
          )}
          <div className="flex justify-end">
            <Button
              variant="text"
              onClick={() => {
                if (selectedCardIndex !== null) {
                  const newData = [...labelSticker.data];
                  newData[selectedCardIndex] = {};
                  setLabelSticker({
                    ...labelSticker,
                    data: newData,
                  });
                }
                setIsSelectModalOpen(false);
              }}
            >
              비우기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
