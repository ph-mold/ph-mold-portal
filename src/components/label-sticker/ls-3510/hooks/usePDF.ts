import { useState } from "react";
import { LabelSticker } from "../../../../lib/types/label-sticker";
import { postLS3510PDF } from "../../../../lib/api/label-sticker";
import { useAlert } from "../../../../hooks/useAlert";

export function usePDF() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const alert = useAlert();

  const generatePDF = async (labelSticker: LabelSticker) => {
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
      const blob = await postLS3510PDF(labelSticker);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPdfBlob(blob);
      alert({
        description: "PDF가 생성되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    } catch {
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
