import { useSearchParams } from "react-router-dom";

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
