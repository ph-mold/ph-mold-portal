import { LabelStickerHistory } from "@/lib/types/label-sticker";
import { Button } from "@ph-mold/ph-ui";
import { formatKoreanDateTime } from "@/utils/format";

interface Props {
  item: LabelStickerHistory;
  onPdfView: (item: LabelStickerHistory) => void;
  onCopyWrite: (item: LabelStickerHistory) => void;
}

export function HistoryListItem({ item, onPdfView, onCopyWrite }: Props) {
  return (
    <div className="border border-border-strong rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-background">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-base">{item.fileName}</h3>
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            <span>{formatKoreanDateTime(item.createdAt)}</span>
            <span>•</span>
            <span>{item.operator}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="small"
            onClick={() => onCopyWrite(item)}
          >
            복사 작성
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => onPdfView(item)}
          >
            PDF 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
