import useSWR from "swr";
import { useHeader } from "../../../hooks/useHeader";
import {
  IGetSampleRequestListResponse,
  ISampleRequest,
} from "../../../lib/types/sample-request";
import {
  GET_SAMPLE_REQUESTS_PAGINATED,
  getSampleRequestsPaginated,
} from "../../../lib/api/sample-request";
import { SampleRequestList } from "@/components/features/sample-request";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import ContentLayout from "@/components/common/layout/ContentLayout";

const ITEMS_PER_PAGE = 5;

export default function SampleRequestsPage() {
  useHeader({
    title: "샘플 요청",
    prevLink: "/erp",
  });

  const { currentPage, handlePageChange } = usePagination();

  const { data: SampleRequests, isLoading } =
    useSWR<IGetSampleRequestListResponse>(
      [GET_SAMPLE_REQUESTS_PAGINATED, currentPage],
      () =>
        getSampleRequestsPaginated({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        })
    );

  const navigate = useNavigate();
  const handleDoubleClick = (row: ISampleRequest) => {
    navigate(`/erp/sample-requests/${row.id}`);
  };

  const currentItems = SampleRequests?.items ?? [];
  const totalPages = Math.ceil((SampleRequests?.total || 0) / ITEMS_PER_PAGE);

  return (
    <ContentLayout
      title="샘플 요청"
      subtitle="샘플 요청 목록을 확인할 수 있습니다."
      contentSections={[
        {
          title: "샘플 요청 목록",
          component: (
            <>
              {!isLoading && SampleRequests && (
                <SampleRequestList
                  items={currentItems}
                  onClick={handleDoubleClick}
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
