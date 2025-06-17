import { useState } from "react";
import { LabelSticker } from "../../../lib/types/label-sticker";
import { isCanceled } from "@/lib/axiosInstance";
import { useAlert } from "@ph-mold/ph-ui";

export interface Props {
  generatePdfFn: (params: LabelSticker, signal?: AbortSignal) => Promise<Blob>;
}

export function usePDF({ generatePdfFn }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const alert = useAlert();

  const generatePDF = async (
    labelSticker: LabelSticker,
    signal?: AbortSignal
  ) => {
    if (!labelSticker.filename) {
      alert({
        description: "파일명을 입력해주세요.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
      return;
    }

    try {
      setIsGenerating(true);
      const blob = await generatePdfFn(labelSticker, signal);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPdfBlob(blob);
      alert({
        description: "PDF가 생성되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    } catch (e) {
      if (isCanceled(e)) return;
      alert({
        title: "오류",
        description: "PDF 생성에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = (filename: string) => {
    if (!pdfBlob || !filename) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    isGenerating,
    pdfUrl,
    pdfBlob,
    generatePDF,
    downloadPDF,
  };
}
