import { LabelStickerHistory } from "@/lib/types/label-sticker";
import { Pagination } from "@/components/common/Pagination";
import { HistoryListItem } from ".";

interface HistoryListProps {
  items: LabelStickerHistory[];
  onPdfView: (item: LabelStickerHistory) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function HistoryList({
  items,
  onPdfView,
  currentPage,
  totalPages,
  onPageChange,
}: HistoryListProps) {
  return (
    <>
      <div className="space-y-2">
        {items.map((item) => (
          <HistoryListItem key={item.id} item={item} onPdfView={onPdfView} />
        ))}
      </div>
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
