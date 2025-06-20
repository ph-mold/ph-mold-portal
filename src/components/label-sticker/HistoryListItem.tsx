import { LabelStickerHistory } from "@/lib/types/label-sticker";
import { Button } from "@ph-mold/ph-ui";
import { formatKoreanDateTime } from "@/utils/format";

interface Props {
  item: LabelStickerHistory;
  onPdfView: (item: LabelStickerHistory) => void;
  onCopyWrite: (item: LabelStickerHistory) => void;
}

export function HistoryListItem({ item, onPdfView, onCopyWrite }: Props) {
  // 첫 번째 유효한 데이터에서 value1 추출
  const firstValidData = item.labelData.find(
    (data) =>
      data && typeof data === "object" && "value1" in data && data.value1
  );
  const value1 = firstValidData?.value1 || "";

  // 라벨 타입별 색상 설정
  const getTagStyle = () => {
    if (item.labelType === "ls-3510") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    } else {
      return "bg-green-50 text-green-700 border-green-200";
    }
  };

  return (
    <div className="border border-border-strong rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-background">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-base">{item.fileName}</h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTagStyle()}`}
            >
              {item.labelType.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            {value1 && (
              <>
                <span className="font-medium text-gray-800">{value1}</span>
                <span>•</span>
              </>
            )}
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
