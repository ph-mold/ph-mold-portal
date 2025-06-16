import { LabelStickerHistory } from "@/lib/types/label-sticker";
import { Button } from "@ph-mold/ph-ui";
import { formatKoreanDateTime } from "@/utils/format";

interface HistoryListItemProps {
  item: LabelStickerHistory;
  onPdfView: (item: LabelStickerHistory) => void;
}

export function HistoryListItem({ item, onPdfView }: HistoryListItemProps) {
  return (
    <div className="border-2 border-[#E2E8F0] rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-base">{item.fileName}</h3>
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            <span>{formatKoreanDateTime(item.createdAt)}</span>
            <span>•</span>
            <span>{item.operator}</span>
          </div>
        </div>
        <Button variant="outlined" size="small" onClick={() => onPdfView(item)}>
          PDF 보기
        </Button>
      </div>
    </div>
  );
}
