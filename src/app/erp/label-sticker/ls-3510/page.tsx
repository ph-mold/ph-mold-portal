import { useHeader } from "../../../../hooks/useHeader";
import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { useState } from "react";
import {
  LabelData,
  LabelSticker,
  LABEL_COLORS,
} from "../../../../lib/types/label-sticker";
import { postLS3510PDF } from "../../../../lib/api/label-sticker";
import { PlusCircle, FileDown, FilePlus } from "lucide-react";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

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

  // PDF 생성
  const handleGeneratePDF = async () => {
    if (!labelSticker.filename) {
      alert("파일명을 입력해주세요.");
      return;
    }

    try {
      setIsGenerating(true);
      const blob = await postLS3510PDF(labelSticker);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPdfBlob(blob);
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("PDF 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  // PDF 다운로드
  const handleDownloadPDF = () => {
    if (!pdfBlob || !labelSticker.filename) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `${labelSticker.filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="mb-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Input
            placeholder="파일명 입력"
            value={labelSticker.filename}
            onChange={(e) =>
              setLabelSticker({ ...labelSticker, filename: e.target.value })
            }
          />
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="outlined"
            startIcon={<PlusCircle size={16} />}
          >
            데이터 추가
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            startIcon={<FilePlus size={16} />}
          >
            {isGenerating ? "생성 중..." : "PDF 생성"}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={!pdfBlob}
            variant="outlined"
            startIcon={<FileDown size={16} />}
          >
            다운로드
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        {/* 라벨 카드 영역 */}
        <div className="h-full flex shrink-0">
          <div className="flex gap-6 h-full">
            {/* 왼쪽 5개 라벨 */}
            <div className="h-full">
              <div className="grid grid-rows-5 gap-4 h-full">
                {labelSticker.data.map(
                  (data, index) =>
                    index % 2 === 0 && (
                      <div
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className="rounded-lg border-2 hover:border-primary transition-colors h-full cursor-pointer relative overflow-hidden"
                        style={{
                          backgroundColor:
                            "value1" in data
                              ? (data as LabelData).backgroundColor
                              : "white",
                          borderColor:
                            "value1" in data
                              ? (data as LabelData).backgroundColor
                              : "#E2E8F0",
                        }}
                      >
                        <div className="h-full aspect-[7/4] flex p-2">
                          {!("value1" in data) ? (
                            <span className="text-gray-400 text-sm m-auto">
                              클릭
                            </span>
                          ) : (
                            <div className="w-full text-[10px] space-y-0.5 overflow-hidden">
                              <div className="flex items-center gap-1 overflow-hidden">
                                {(data as LabelData).value1 && (
                                  <div className="font-medium truncate">
                                    {(data as LabelData).value1}
                                  </div>
                                )}
                                {(data as LabelData).value2 && (
                                  <>
                                    <div className="shrink-0">|</div>
                                    <div className="truncate">
                                      {(data as LabelData).value2}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap overflow-hidden">
                                {(data as LabelData).value3 && (
                                  <div className="truncate">
                                    코드: {(data as LabelData).value3}
                                  </div>
                                )}
                                {(data as LabelData).value4 && (
                                  <div className="truncate">
                                    수량: {(data as LabelData).value4}
                                  </div>
                                )}
                                {(data as LabelData).value5 && (
                                  <div className="truncate">
                                    중량: {(data as LabelData).value5}
                                  </div>
                                )}
                                {(data as LabelData).value6 && (
                                  <div className="truncate">
                                    납품일: {(data as LabelData).value6}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* 오른쪽 5개 라벨 */}
            <div className="h-full">
              <div className="grid grid-rows-5 gap-4 h-full">
                {labelSticker.data.map(
                  (data, index) =>
                    index % 2 === 1 && (
                      <div
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className="rounded-lg border-2 hover:border-primary transition-colors h-full cursor-pointer relative overflow-hidden"
                        style={{
                          backgroundColor:
                            "value1" in data
                              ? (data as LabelData).backgroundColor
                              : "white",
                          borderColor:
                            "value1" in data
                              ? (data as LabelData).backgroundColor
                              : "#E2E8F0",
                        }}
                      >
                        <div className="h-full aspect-[7/4] flex p-2">
                          {!("value1" in data) ? (
                            <span className="text-gray-400 text-sm m-auto">
                              클릭
                            </span>
                          ) : (
                            <div className="w-full text-[10px] space-y-0.5 overflow-hidden">
                              <div className="flex items-center gap-1 overflow-hidden">
                                {(data as LabelData).value1 && (
                                  <div className="font-medium truncate">
                                    {(data as LabelData).value1}
                                  </div>
                                )}
                                {(data as LabelData).value2 && (
                                  <>
                                    <div className="shrink-0">|</div>
                                    <div className="truncate">
                                      {(data as LabelData).value2}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap overflow-hidden">
                                {(data as LabelData).value3 && (
                                  <div className="truncate">
                                    코드: {(data as LabelData).value3}
                                  </div>
                                )}
                                {(data as LabelData).value4 && (
                                  <div className="truncate">
                                    수량: {(data as LabelData).value4}
                                  </div>
                                )}
                                {(data as LabelData).value5 && (
                                  <div className="truncate">
                                    중량: {(data as LabelData).value5}
                                  </div>
                                )}
                                {(data as LabelData).value6 && (
                                  <div className="truncate">
                                    납품일: {(data as LabelData).value6}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PDF 뷰어 영역 */}
        <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              PDF를 생성하면 여기에 표시됩니다
            </div>
          )}
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
            addedData.map((data, index) => {
              const isSelected =
                selectedCardIndex !== null &&
                JSON.stringify(labelSticker.data[selectedCardIndex]) ===
                  JSON.stringify(data);

              return (
                <div
                  key={index}
                  onClick={() => handleSelectData(data)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:border-primary"
                  }`}
                  style={{
                    backgroundColor: data.backgroundColor,
                    borderColor: data.backgroundColor,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {data.value1 && (
                        <div className="font-medium text-lg">{data.value1}</div>
                      )}
                      {data.value2 && (
                        <>
                          <div className="text-sm text-gray-600">|</div>
                          <div className="text-sm text-gray-600">
                            {data.value2}
                          </div>
                        </>
                      )}
                      {isSelected && (
                        <div className="ml-auto px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          선택됨
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      {data.value3 && <div>코드: {data.value3}</div>}
                      {data.value4 && <div>수량: {data.value4}</div>}
                      {data.value5 && <div>중량: {data.value5}</div>}
                      {data.value6 && <div>납품일: {data.value6}</div>}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-8">
              추가된 데이터가 없습니다
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              color="error"
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
