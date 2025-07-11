import { useNavigate } from "react-router-dom";
import {
  IGetProduct,
  IGetProductListResponse,
} from "../../../lib/types/product";
import useSWR from "swr";
import {
  GET_PRODUCTS_BY_CATEGORY_PAGINATED,
  getProductsByCategoryPaginated,
} from "@/lib/api/products";
import { useHeader } from "@/hooks/useHeader";
import ContentLayout from "@/components/common/layout/ContentLayout";
import { usePagination } from "@/hooks/usePagination";
import { ProductList } from "@/components/features/products";

const ITEMS_PER_PAGE = 8;

export default function ManagementProductsPage() {
  useHeader({
    title: "제품 관리",
    prevLink: "/cms",
  });
  const { currentPage, handlePageChange } = usePagination();

  const { data: products, isLoading: isProductsLoading } = useSWR<
    IGetProductListResponse | undefined
  >([GET_PRODUCTS_BY_CATEGORY_PAGINATED, "all", currentPage], () =>
    getProductsByCategoryPaginated("all", currentPage, ITEMS_PER_PAGE)
  );

  const currentItems = products?.items ?? [];
  const totalPages = Math.ceil((products?.total || 0) / ITEMS_PER_PAGE);

  const navigate = useNavigate();
  const handleOnClick = (product: IGetProduct) => {
    navigate(`/cms/products/${product.key}`);
  };

  return (
    <ContentLayout
      title="제품 관리"
      contentSections={[
        {
          title: "제품 목록",
          component: (
            <>
              {!isProductsLoading && products && (
                <ProductList
                  currentItems={currentItems}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  handleOnClick={handleOnClick}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
}
