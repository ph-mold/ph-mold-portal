import { useSearchParams } from "react-router-dom";

//TODO 추후 data를 받아 페이지네이션 계산하도록 수정
/*
const currentItems = data?.items ?? [];
  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);
*/
export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return {
    currentPage,
    handlePageChange,
  };
}
