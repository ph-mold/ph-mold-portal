import { useState } from "react";
import { Button, Modal } from "@ph-mold/ph-ui";
import { Pagination } from "@/components/common/Pagination";
import { useHeader } from "@/hooks/useHeader";
import { useSearchParams } from "react-router-dom";
import {
  LabelStickerHistory,
  LabelStickerListResponse,
} from "@/lib/types/label-sticker";
import useSWR from "swr";
import {
  GET_LABEL_STICKER_HISTORIES,
  getLabelStickerHistories,
  postLS3510PDFRegenerate,
} from "@/lib/api/label-sticker";
import { formatKoreanDateTime } from "@/utils/format";
import { PDFViewer } from "@/components/label-sticker/ls-3510";
import { Loader2 } from "lucide-react";
import { usePDF } from "@/components/label-sticker/ls-3510/hooks";

const ITEMS_PER_PAGE = 5;

export default function LabelStickerPage() {
  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] =
    useState<LabelStickerHistory | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: labelStickerHistories } = useSWR<
    LabelStickerListResponse | undefined
  >([GET_LABEL_STICKER_HISTORIES, currentPage], () =>
    getLabelStickerHistories({ page: currentPage, limit: ITEMS_PER_PAGE })
  );

  const currentItems = labelStickerHistories?.items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(
    (labelStickerHistories?.total || 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const { isGenerating, pdfUrl, generatePDF } = usePDF({
    generatePdfFn: postLS3510PDFRegenerate,
  });

  const handlePdfView = (label: LabelStickerHistory) => {
    setSelectedLabel(label);
    generatePDF({
      filename: label.fileName,
      data: label.labelData,
    });
    setIsPdfModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">라벨 스티커 이력</h1>

      <div className="space-y-2">
        {currentItems?.map((item) => (
          <div
            key={item.id}
            className="border-2 border-[#E2E8F0] rounded-lg px-4 py-3  hover:shadow-sm transition-shadow bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-base">{item.fileName}</h3>
                <div className="flex gap-3 text-sm text-gray-600 mt-1">
                  <span>{formatKoreanDateTime(item.createdAt)}</span>
                  <span>•</span>
                  <span>{item.operator}</span>
                </div>
              </div>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handlePdfView(item)}
                disabled={isGenerating}
              >
                PDF 보기
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        open={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title={`${selectedLabel?.fileName}`}
        className="max-w-[90vw]"
        bodyClassName="!p-2"
      >
        <div
          className="w-full bg-white rounded shadow-sm mx-auto"
          style={{
            aspectRatio: "1/1.4142",
            maxHeight: "calc(90vh - 120px)",
            width: "min(calc(90vh - 120px) / 1.4142, 100%)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-signature" />
                <p className="text-gray-600">PDF 생성 중...</p>
              </div>
            ) : pdfUrl ? (
              <PDFViewer pdfUrl={pdfUrl} />
            ) : (
              <p className="text-gray-500">PDF를 생성하지 못했습니다.</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
