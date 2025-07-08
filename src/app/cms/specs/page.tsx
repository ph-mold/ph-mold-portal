import ContentLayout from "@/components/domain/layout/ContentLayout";

import { SpecFormModal, SpecList } from "@/components/spec";
import { ITEMS_PER_PAGE } from "@/components/spec/constants";
import { useSpecManagement } from "@/components/spec/hooks";

import { useHeader } from "@/hooks/useHeader";
import { usePagination } from "@/hooks/usePagination";
import {
  GET_SPEC_TYPES_PAGINATED,
  getSpecTypesPaginated,
} from "@/lib/api/spec-types";
import { ISpecTypeListResponse } from "@/lib/types/spec";
import { Button } from "@ph-mold/ph-ui";
import { Plus } from "lucide-react";
import useSWR from "swr";

export default function SpecsPage() {
  useHeader({
    title: "스펙 관리",
    prevLink: "/cms",
  });

  const {
    isModalOpen,
    editingSpec,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleDelete,
  } = useSpecManagement();

  const { currentPage, handlePageChange } = usePagination();

  const { data: specTypes } = useSWR<ISpecTypeListResponse | undefined>(
    [GET_SPEC_TYPES_PAGINATED, currentPage],
    () => getSpecTypesPaginated({ page: currentPage, limit: ITEMS_PER_PAGE })
  );

  const currentItems = specTypes?.items ?? [];
  const totalPages = Math.ceil((specTypes?.total || 0) / ITEMS_PER_PAGE);

  return (
    <>
      <SpecFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        editingSpecType={editingSpec ?? undefined}
      />
      <ContentLayout
        title="스펙 관리"
        subtitle="제품의 스펙을 관리합니다"
        actionSection={
          <Button
            variant="outlined"
            startIcon={<Plus size={20} />}
            onClick={() => handleModalOpen()}
          >
            스펙 추가
          </Button>
        }
        contentSections={[
          {
            title: "스펙 리스트",
            component: (
              <SpecList
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
    </>
  );
}
