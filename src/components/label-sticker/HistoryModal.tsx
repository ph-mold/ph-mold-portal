import { Button, Modal } from "@ph-mold/ph-ui";
import { FileDown, Loader2 } from "lucide-react";

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  isGenerating: boolean;
  pdfUrl: string | null;
  onDownload: () => void;
  children?: React.ReactNode;
}

export function HistoryModal({
  open,
  onClose,
  title,
  isGenerating,
  pdfUrl,
  onDownload,
  children,
}: HistoryModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} bodyClassName="!p-4">
      <div
        className="w-full mx-auto"
        style={{
          aspectRatio: "1/1.4142",
          maxHeight: "calc(90vh - 120px)",
          width: "min(calc(90vh - 120px) / 1.4142, 100%)",
        }}
      >
        <div className="w-full h-full flex ">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2 w-full h-full justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-signature" />
              <p className="text-foreground">PDF 생성 중...</p>
            </div>
          ) : pdfUrl ? (
            <div className="flex flex-col w-full h-full gap-4">
              <div className="flex justify-end">
                <Button
                  onClick={onDownload}
                  variant="outlined"
                  startIcon={<FileDown size={16} />}
                >
                  다운로드
                </Button>
              </div>
              {children}
            </div>
          ) : (
            <p className="text-gray-500">PDF를 생성하지 못했습니다.</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
