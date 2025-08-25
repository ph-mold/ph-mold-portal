import useSWR from "swr";
import { useHeader } from "../../../hooks/useHeader";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import ContentLayout from "@/components/common/layout/ContentLayout";
import { IInquiriesResponse, IInquiry } from "@/lib/types/inquiry";
import {
  GET_INQUIRIES_PAGINATED,
  getInquiriesWithPagination,
} from "@/lib/api/inquiry";
import { InquiryList } from "@/components/features/inquiry";

const ITEMS_PER_PAGE = 5;

export default function InquiriesPage() {
  useHeader({
    title: "문의 내역",
    prevLink: "/erp",
  });

  const { currentPage, handlePageChange } = usePagination();

  const { data, isLoading } = useSWR<IInquiriesResponse>(
    [GET_INQUIRIES_PAGINATED, currentPage],
    () =>
      getInquiriesWithPagination({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      })
  );

  const navigate = useNavigate();
  const handleOnClick = (row: IInquiry) => {
    navigate(`/erp/inquiry/${row.id}`);
  };

  const currentItems = data?.items ?? [];
  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  return (
    <ContentLayout
      title="문의 내역"
      subtitle="문의 내역을 확인할 수 있습니다."
      contentSections={[
        {
          title: "문의 내역 목록",
          component: (
            <>
              {!isLoading && data && (
                <InquiryList
                  items={currentItems}
                  onClick={handleOnClick}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
}
