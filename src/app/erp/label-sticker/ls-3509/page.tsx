import { useHeader } from "@/hooks/useHeader";
import {
  LabelGrid,
  AddDataModal,
  SelectDataModal,
  LSHeader,
} from "@/components/label-sticker/label";
import { LabelCard } from "@/components/label-sticker/label/ls-3509";
import {
  useLabelData,
  useModals,
  usePDF,
} from "@/components/label-sticker/hooks";
import {
  GET_LABEL_STICKER_HISTORIES,
  getPDFGenerateFunction,
} from "@/lib/api/label-sticker";
import { LABEL_TYPES } from "@/lib/types/label-sticker";
import { PDFViewer } from "@/components/label-sticker";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mutate } from "swr";

export default function LS3509Page() {
  useHeader({
    title: "LS-3509 라벨 생성",
    prevLink: "/erp/label-sticker",
  });

  const location = useLocation();
  // 라벨 데이터 관리
  const {
    labelSticker,
    setLabelSticker,
    addedData,
    setAddedData,
    setSelectedCardIndex,
    handleAddData,
    handleSelectData,
    handleClearData,
    selectedData,
    handleBulkApplyData,
  } = useLabelData({ labelType: LABEL_TYPES.LS_3509 });

  // location.state로부터 데이터 받아서 카드에 배치
  useEffect(() => {
    if (location.state && location.state.filename && location.state.data) {
      setLabelSticker({
        filename: location.state.filename,
        data: location.state.data,
        labelType: LABEL_TYPES.LS_3509,
      });
      setAddedData(location.state.uniqueData);
    }
  }, [location.state, setLabelSticker, setAddedData]);

  // 모달 상태 관리
  const {
    isAddModalOpen,
    isSelectModalOpen,
    isBulkApplyModalOpen,
    openBulkApplyModal,
    closeBulkApplyModal,
    openAddModal,
    closeAddModal,
    openSelectModal,
    closeSelectModal,
  } = useModals();

  // PDF 관리 (동적으로 함수 선택)
  const { isGenerating, pdfUrl, pdfBlob, generatePDF, downloadPDF } = usePDF({
    generatePdfFn: (data) => {
      const generateFunction = getPDFGenerateFunction(data.labelType);
      return generateFunction(data);
    },
  });

  // PDF 생성 버튼 클릭 시 히스토리 캐시 초기화
  const handleGeneratePDF = async () => {
    await generatePDF(labelSticker);
    mutate(
      (key) => Array.isArray(key) && key[0] === GET_LABEL_STICKER_HISTORIES,
      undefined
    );
  };

  // 라벨 카드 클릭 핸들러
  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    openSelectModal();
  };

  return (
    <div className="h-full py-8 px-4 sm:px-6 flex flex-col sm:overflow-hidden overflow-auto">
      {/* 헤더: 파일명 입력, PDF 생성/다운로드 버튼 */}
      <LSHeader
        filename={labelSticker.filename}
        onFilenameChange={(filename) =>
          setLabelSticker({ ...labelSticker, filename })
        }
        onAddClick={openAddModal}
        onBulkApplyClick={openBulkApplyModal}
        onGenerateClick={handleGeneratePDF}
        onDownloadClick={() => downloadPDF(labelSticker.filename)}
        isGenerating={isGenerating}
        canDownload={!!pdfBlob}
      />

      <div className="flex-1 flex gap-6 flex-col sm:!flex-row">
        <LabelGrid
          data={labelSticker.data}
          onCardClick={handleCardClick}
          labelType={LABEL_TYPES.LS_3509}
          LabelCardComponent={LabelCard}
        />

        {/* PDF 미리보기 */}
        <div className="w-full aspect-[1/1.4142] sm:aspect-auto ">
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      </div>

      {/* 새로운 데이터 추가 모달 */}
      <AddDataModal
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={(data) => handleAddData(data)}
        labelType={LABEL_TYPES.LS_3509}
      />

      {/* 기존 데이터 선택 모달 */}
      <SelectDataModal
        open={isSelectModalOpen}
        onClose={closeSelectModal}
        onSelect={(data) => handleSelectData(data, closeSelectModal)}
        onClear={() => {
          handleClearData();
          closeSelectModal();
        }}
        addedData={addedData}
        selectedData={selectedData}
        labelType={LABEL_TYPES.LS_3509}
      />

      {/* 데이터 일괄 적용 모달 */}
      <SelectDataModal
        open={isBulkApplyModalOpen}
        onClose={closeBulkApplyModal}
        onSelect={(data) => {
          handleBulkApplyData(data);
          closeBulkApplyModal();
        }}
        onClear={() => {
          handleClearData(true);
          closeBulkApplyModal();
        }}
        addedData={addedData}
        selectedData={selectedData}
        labelType={LABEL_TYPES.LS_3509}
      />
    </div>
  );
}
