import useSWR from "swr";
import { GET_TAGS_PAGINATED, getTagsPaginated } from "../../../lib/api/tags";
import { Button } from "@ph-mold/ph-ui";
import { ITagListResponse } from "../../../lib/types/tag";
import { useHeader } from "../../../hooks/useHeader";
import { Plus } from "lucide-react";
import ContentLayout from "@/components/common/layout/ContentLayout";
import {
  TagFormModal,
  TagList,
  useTagManagement,
} from "@/components/features/tag";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 5;

export default function TagsPage() {
  useHeader({
    title: "태그 관리",
    prevLink: "/cms",
  });

  const { currentPage, handlePageChange } = usePagination();

  const { data: tags } = useSWR<ITagListResponse | undefined>(
    [GET_TAGS_PAGINATED, currentPage],
    () => getTagsPaginated({ page: currentPage, limit: ITEMS_PER_PAGE })
  );

  const currentItems = tags?.items ?? [];
  const totalPages = Math.ceil((tags?.total || 0) / ITEMS_PER_PAGE);

  const {
    isModalOpen,
    editingTag,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleDelete,
  } = useTagManagement();

  return (
    <>
      <ContentLayout
        title="태그 관리"
        subtitle="제품의 태그를 관리합니다"
        actionSection={
          <Button
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() => handleModalOpen()}
          >
            태그 추가
          </Button>
        }
        contentSections={[
          {
            title: "스펙 리스트",
            component: (
              <TagList
                handleModalOpen={handleModalOpen}
                handleDelete={handleDelete}
                currentItems={currentItems}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            ),
          },
        ]}
      />

      <TagFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        editingTag={editingTag ?? undefined}
      />
    </>
  );
}
