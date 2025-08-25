import { Pagination } from "@ph-mold/ph-ui";
import { InquiryItem } from "./";
import { IInquiry } from "@/lib/types/inquiry";

interface Props {
  items: IInquiry[];
  onClick: (item: IInquiry) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function InquiryList({
  items,
  onClick,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <>
      <div className="space-y-2">
        {items.map((item) => (
          <InquiryItem key={item.id} item={item} onClick={onClick} />
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
