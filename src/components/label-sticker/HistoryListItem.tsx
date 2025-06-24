import { LabelStickerHistory } from "@/lib/types/label-sticker";
import { Button, useAlert } from "@ph-mold/ph-ui";
import { formatKoreanDateTime } from "@/utils/format";
import { Popover } from "../common/Popover";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface Props {
  item: LabelStickerHistory;
  onPdfView: (item: LabelStickerHistory) => void;
  onCopyWrite: (item: LabelStickerHistory) => void;
  onDelete: (item: LabelStickerHistory) => void;
}

export function HistoryListItem({
  item,
  onPdfView,
  onCopyWrite,
  onDelete,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreButtonHovered, setIsMoreButtonHovered] = useState(false);
  const alert = useAlert();

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

  // 라벨 타입별 오버레이 색상 설정
  const getOverlayStyle = () => {
    if (item.labelType === "ls-3510") {
      return "bg-blue-500/8";
    } else {
      return "bg-green-500/8";
    }
  };

  // 라벨 타입별 텍스트 박스 색상 설정
  const getTextBoxStyle = () => {
    if (item.labelType === "ls-3510") {
      return "bg-blue-50/90 border-blue-200/30 text-blue-700 !border-blue-200";
    } else {
      return "bg-green-50/90 border-green-200/30 text-green-700 !border-green-200";
    }
  };

  const handleItemClick = () => {
    onPdfView(item);
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMoreButtonMouseEnter = () => {
    setIsMoreButtonHovered(true);
  };

  const handleMoreButtonMouseLeave = () => {
    setIsMoreButtonHovered(false);
  };

  const handleDelete = () => {
    alert({
      title: "이력 삭제",
      description: `"${item.fileName}"을 삭제하시겠습니까?`,
      onAccept: () => onDelete(item),
      acceptLabel: "삭제",
      cancelLabel: "취소",
    });
  };

  return (
    <div
      className="relative border border-border-strong rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-background cursor-pointer group"
      onClick={handleItemClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-medium text-base truncate">{item.fileName}</h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getTagStyle()}`}
            >
              {item.labelType.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            {value1 && (
              <>
                <span className="font-medium text-gray-800 truncate">
                  {value1}
                </span>
                <span className="text-gray-400">•</span>
              </>
            )}
            <span>{formatKoreanDateTime(item.createdAt)}</span>
            <span className="text-gray-400">•</span>
            <span>{item.operator}</span>
          </div>
        </div>
        <div
          className="relative z-10 ml-3"
          onClick={handlePopoverClick}
          onMouseEnter={handleMoreButtonMouseEnter}
          onMouseLeave={handleMoreButtonMouseLeave}
        >
          <Popover
            trigger={
              <Button
                variant="text"
                size="small"
                className="!p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical size={16} />
              </Button>
            }
            placement="bottom-right"
          >
            <div className="flex flex-col p-2 gap-1 w-40">
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={() => onCopyWrite(item)}
                className="!py-2.5"
              >
                복사 작성
              </Button>
              <Button
                variant="text"
                onClick={handleDelete}
                color="error"
                size="small"
                className="!py-2.5"
              >
                삭제
              </Button>
            </div>
          </Popover>
        </div>
      </div>

      {/* Hover 오버레이 - 더보기 버튼에 마우스가 없을 때만 표시 */}
      {isHovered && !isMoreButtonHovered && (
        <div
          className={`absolute inset-0 ${getOverlayStyle()} backdrop-blur-[2px] rounded-lg flex items-center justify-center z-9 pointer-events-none transition-all duration-200`}
        >
          <div
            className={`${getTextBoxStyle()} backdrop-blur-md px-3 py-1.5 rounded-md shadow-sm border`}
          >
            <span className="text-xs font-medium tracking-wide">PDF 보기</span>
          </div>
        </div>
      )}
    </div>
  );
}
