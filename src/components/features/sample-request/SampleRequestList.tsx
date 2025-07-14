import { SampleRequestItem } from ".";
import { Pagination } from "@ph-mold/ph-ui";
import { ISampleRequest } from "@/lib/types/sample-request";

interface Props {
  items: ISampleRequest[];
  onClick: (item: ISampleRequest) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SampleRequestList({
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
          <SampleRequestItem key={item.id} item={item} onClick={onClick} />
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
