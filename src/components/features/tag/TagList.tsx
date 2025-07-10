import { Pagination } from "@ph-mold/ph-ui";
import { TagItem } from "./TagItem";
import { ITag } from "@/lib/types/tag";

interface Props {
  currentItems: ITag[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleModalOpen: (tag: ITag) => void;
  handleDelete: (tag: ITag) => void;
}

export function TagList({
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
        {currentItems.map((tag) => (
          <TagItem
            key={tag.id}
            tag={tag}
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
