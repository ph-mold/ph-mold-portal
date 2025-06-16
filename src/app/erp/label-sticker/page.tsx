import { useState } from "react";
import { useHeader } from "@/hooks/useHeader";
import { useSearchParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import {
  GET_LABEL_STICKER_HISTORIES,
  getLabelStickerHistories,
  postLS3510PDFRegenerate,
} from "@/lib/api/label-sticker";
import {
  LabelStickerHistory,
  LabelStickerListResponse,
} from "@/lib/types/label-sticker";
import { usePDF } from "@/components/label-sticker/hooks";
import {
  PDFViewer,
  HistoryModal,
  HistoryList,
} from "@/components/label-sticker";

const ITEMS_PER_PAGE = 5;

export default function LabelStickerPage() {
  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] =
    useState<LabelStickerHistory | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: labelStickerHistories } = useSWR<
    LabelStickerListResponse | undefined
  >([GET_LABEL_STICKER_HISTORIES, currentPage], () =>
    getLabelStickerHistories({ page: currentPage, limit: ITEMS_PER_PAGE })
  );

  const currentItems = labelStickerHistories?.items ?? [];
  const totalPages = Math.ceil(
    (labelStickerHistories?.total || 0) / ITEMS_PER_PAGE
  );

  // PDF 관련 커스텀 훅
  const { isGenerating, pdfUrl, generatePDF, downloadPDF } = usePDF({
    generatePdfFn: postLS3510PDFRegenerate,
  });

  // PDF 보기 버튼 클릭 시
  const handlePdfView = (item: LabelStickerHistory) => {
    setSelectedLabel(item);
    setIsPdfModalOpen(true);
    generatePDF({
      filename: item.fileName,
      data: item.labelData,
    });
  };

  // 복사 작성 버튼 클릭 시
  const handleCopyWrite = (item: LabelStickerHistory) => {
    // labelData 중복 제거 (JSON.stringify 기준)
    const uniqueData = item.labelData
      .filter((data) => Object.keys(data).length > 0)
      .filter(
        (data, idx, arr) =>
          idx ===
          arr.findIndex((d) => JSON.stringify(d) === JSON.stringify(data))
      );
    navigate("/erp/label-sticker/ls-3510", {
      state: {
        filename: item.fileName,
        data: item.labelData,
        uniqueData,
      },
    });
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">라벨 스티커 이력</h1>
      <HistoryList
        items={currentItems}
        onPdfView={handlePdfView}
        onCopyWrite={handleCopyWrite}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <HistoryModal
        open={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title={selectedLabel?.fileName || ""}
        isGenerating={isGenerating}
        pdfUrl={pdfUrl}
        onDownload={() => downloadPDF(selectedLabel?.fileName || "")}
      >
        {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
      </HistoryModal>
    </div>
  );
}
