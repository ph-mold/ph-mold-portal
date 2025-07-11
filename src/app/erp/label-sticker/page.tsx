import { useNavigate } from "react-router-dom";
import { useHeader } from "@/hooks/useHeader";
import {
  LabelTypeSelector,
  HistoryModal,
  PDFViewer,
  HistoryList,
} from "@/components/features/label-sticker";

import ContentLayout from "@/components/common/layout/ContentLayout";
import { useLabelHistory } from "@/components/features/label-sticker/hooks";

export default function LabelStickerPage() {
  const navigate = useNavigate();

  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  const {
    isPdfModalOpen,
    selectedLabel,
    currentItems,
    currentPage,
    totalPages,
    isGenerating,
    pdfUrl,
    handlePdfView,
    handleCopyWrite,
    handleDelete,
    handlePageChange,
    handlePdfModalClose,
    downloadPDF,
  } = useLabelHistory();

  const handleLabelTypeClick = (labelType: string) => {
    navigate(`/erp/label-sticker/${labelType}`);
  };

  return (
    <>
      <HistoryModal
        open={isPdfModalOpen}
        onClose={handlePdfModalClose}
        title={selectedLabel?.fileName || ""}
        isGenerating={isGenerating}
        pdfUrl={pdfUrl}
        onDownload={() => downloadPDF(selectedLabel?.fileName || "")}
      >
        {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
      </HistoryModal>
      <ContentLayout
        title="라벨 스티커"
        subtitle="원하는 라벨 타입을 선택하세요"
        actionSection={
          <LabelTypeSelector onLabelTypeClick={handleLabelTypeClick} />
        }
        contentSections={[
          {
            title: "라벨 스티커 이력",
            component: (
              <HistoryList
                items={currentItems}
                onPdfView={handlePdfView}
                onCopyWrite={handleCopyWrite}
                onDelete={handleDelete}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ),
          },
        ]}
      />
    </>
  );
}
