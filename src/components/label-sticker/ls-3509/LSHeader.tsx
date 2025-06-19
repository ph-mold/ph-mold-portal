import { Button, Input } from "@ph-mold/ph-ui";
import { PlusCircle, FileDown, FilePlus } from "lucide-react";

interface LSHeaderProps {
  filename: string;
  onFilenameChange: (filename: string) => void;
  onAddClick: () => void;
  onGenerateClick: () => void;
  onDownloadClick: () => void;
  isGenerating: boolean;
  canDownload: boolean;
}

export function LSHeader({
  filename,
  onFilenameChange,
  onAddClick,
  onGenerateClick,
  onDownloadClick,
  isGenerating,
  canDownload,
}: LSHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <Input
          placeholder="파일명 입력"
          value={filename}
          onChange={(e) => onFilenameChange(e.target.value)}
        />
        <Button
          onClick={onAddClick}
          variant="outlined"
          startIcon={<PlusCircle size={16} />}
        >
          데이터 추가
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={onGenerateClick}
          disabled={isGenerating}
          startIcon={<FilePlus size={16} />}
        >
          {isGenerating ? "생성 중..." : "PDF 생성"}
        </Button>
        <Button
          onClick={onDownloadClick}
          disabled={!canDownload}
          variant="outlined"
          startIcon={<FileDown size={16} />}
        >
          다운로드
        </Button>
      </div>
    </div>
  );
}
