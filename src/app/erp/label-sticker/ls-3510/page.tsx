import { useHeader } from "@/hooks/useHeader";
import {
  LabelGrid,
  AddDataModal,
  SelectDataModal,
  LSHeader,
} from "@/components/label-sticker/ls-3510";
import {
  useLabelData,
  useModals,
  usePDF,
} from "@/components/label-sticker/hooks";
import { postLS3510PDF } from "@/lib/api/label-sticker";
import { PDFViewer } from "@/components/label-sticker";

export default function LS3510Page() {
  useHeader({
    title: "LS-3510 라벨 생성",
    prevLink: "/erp",
  });

  // 라벨 데이터 관리
  const {
    labelSticker,
    setLabelSticker,
    newData,
    setNewData,
    addedData,
    setSelectedCardIndex,
    handleAddData,
    handleSelectData,
    handleClearData,
    selectedData,
  } = useLabelData();

  // 모달 상태 관리
  const {
    isAddModalOpen,
    isSelectModalOpen,
    openAddModal,
    closeAddModal,
    openSelectModal,
    closeSelectModal,
  } = useModals();

  // PDF 관리
  const { isGenerating, pdfUrl, pdfBlob, generatePDF, downloadPDF } = usePDF({
    generatePdfFn: postLS3510PDF,
  });

  // 라벨 카드 클릭 핸들러
  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    openSelectModal();
  };

  return (
    <div className="h-full p-6 flex flex-col">
      {/* 헤더: 파일명 입력, PDF 생성/다운로드 버튼 */}
      <LSHeader
        filename={labelSticker.filename}
        onFilenameChange={(filename) =>
          setLabelSticker({ ...labelSticker, filename })
        }
        onAddClick={openAddModal}
        onGenerateClick={() => generatePDF(labelSticker)}
        onDownloadClick={() => downloadPDF(labelSticker.filename)}
        isGenerating={isGenerating}
        canDownload={!!pdfBlob}
      />

      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        {/* 라벨 카드 그리드: 2열 5행의 라벨 카드 표시 */}
        <LabelGrid data={labelSticker.data} onCardClick={handleCardClick} />

        {/* PDF 미리보기 */}
        <PDFViewer pdfUrl={pdfUrl} />
      </div>

      {/* 새로운 데이터 추가 모달 */}
      <AddDataModal
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={() => handleAddData(closeAddModal)}
        data={newData}
        onChange={setNewData}
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
      />
    </div>
  );
}
