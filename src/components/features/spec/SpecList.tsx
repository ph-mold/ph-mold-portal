import { ISpecType } from "@/lib/types/spec";
import { SpecItem } from "./SpecItem";
import { Pagination } from "@ph-mold/ph-ui";

interface Props {
  currentItems: ISpecType[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleModalOpen: (specType: ISpecType) => void;
  handleDelete: (specType: ISpecType) => void;
}

export function SpecList({
  handleModalOpen,
  handleDelete,
  currentItems,
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {currentItems.map((specType) => (
          <SpecItem
            key={specType.id}
            specType={specType}
            onEdit={handleModalOpen}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
