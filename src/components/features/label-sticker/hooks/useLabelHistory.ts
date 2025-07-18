import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import {
  deleteLabelStickerHistory,
  GET_LABEL_STICKER_HISTORIES,
  getLabelStickerHistories,
  getPDFRegenerateFunction,
} from "@/lib/api/label-sticker";
import {
  LabelStickerHistory,
  LabelStickerListResponse,
  LABEL_TYPES,
} from "@/lib/types/label-sticker";
import { usePDF } from "@/components/features/label-sticker/hooks";

const ITEMS_PER_PAGE = 5;

export function useLabelHistory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] =
    useState<LabelStickerHistory | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  // PDF 관련 커스텀 훅 (동적으로 함수 선택)
  const { isGenerating, pdfUrl, generatePDF, downloadPDF } = usePDF({
    generatePdfFn: (data, signal) => {
      const regenerateFunction = getPDFRegenerateFunction(data.labelType);
      return regenerateFunction(data, signal);
    },
  });

  // PDF 보기 버튼 클릭 시
  const handlePdfView = (item: LabelStickerHistory) => {
    setSelectedLabel(item);
    setIsPdfModalOpen(true);
    // 이전 요청이 있다면 취소
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    generatePDF(
      {
        filename: item.fileName,
        data: item.labelData,
        labelType: item.labelType,
      },
      abortRef.current.signal
    );
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

    // 라벨 타입에 따라 적절한 경로로 이동
    const targetPath =
      item.labelType === LABEL_TYPES.LS_3509
        ? "/erp/label-sticker/ls-3509"
        : "/erp/label-sticker/ls-3510";

    navigate(targetPath, {
      state: {
        filename: item.fileName,
        data: item.labelData,
        uniqueData,
      },
    });
  };

  const handleDelete = async (item: LabelStickerHistory) => {
    await deleteLabelStickerHistory(item.id);
    mutate(
      (key) => Array.isArray(key) && key[0] === GET_LABEL_STICKER_HISTORIES,
      undefined
    );
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // PDF 모달 닫기
  const handlePdfModalClose = () => {
    setIsPdfModalOpen(false);
    if (abortRef.current) abortRef.current.abort();
  };

  return {
    // 상태
    isPdfModalOpen,
    selectedLabel,
    currentItems,
    currentPage,
    totalPages,
    isGenerating,
    pdfUrl,

    // 핸들러
    handlePdfView,
    handleCopyWrite,
    handleDelete,
    handlePageChange,
    handlePdfModalClose,

    // PDF 관련
    downloadPDF,
  };
}
