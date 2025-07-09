import { Button, Input } from "@ph-mold/ph-ui";
import { PlusCircle, FileDown, FilePlus, CopyCheck } from "lucide-react";

interface LSHeaderProps {
  filename: string;
  onFilenameChange: (filename: string) => void;
  onAddClick: () => void;
  onBulkApplyClick: () => void;
  onGenerateClick: () => void;
  onDownloadClick: () => void;
  isGenerating: boolean;
  canDownload: boolean;
}

export function LSHeader({
  filename,
  onFilenameChange,
  onAddClick,
  onBulkApplyClick,
  onGenerateClick,
  onDownloadClick,
  isGenerating,
  canDownload,
}: LSHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between shrink-0 !flex-col sm:!flex-row gap-2">
      <div className="flex items-center gap-2 flex-col sm:!flex-row w-full sm:w-fit">
        <Input
          placeholder="파일명 입력"
          value={filename}
          onChange={(e) => onFilenameChange(e.target.value)}
          className="w-full sm:w-fit"
        />
        <Button
          onClick={onAddClick}
          variant="outlined"
          startIcon={<PlusCircle size={16} />}
          className="w-full sm:w-fit"
        >
          데이터 추가
        </Button>
        <Button
          onClick={onBulkApplyClick}
          variant="outlined"
          startIcon={<CopyCheck size={16} />}
          className="w-full sm:w-fit"
        >
          일괄 적용
        </Button>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-fit">
        <Button
          onClick={onGenerateClick}
          loading={isGenerating}
          startIcon={<FilePlus size={16} />}
          className="w-full sm:w-fit"
        >
          {isGenerating ? "생성 중..." : "PDF 생성"}
        </Button>
        <Button
          onClick={onDownloadClick}
          disabled={!canDownload}
          variant="outlined"
          className="w-full sm:w-fit"
          startIcon={<FileDown size={16} />}
        >
          다운로드
        </Button>
      </div>
    </div>
  );
}
