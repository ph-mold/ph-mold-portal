import { useNavigate } from "react-router-dom";
import { IGetProduct } from "../../../lib/types/product";
import useSWR from "swr";
import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory,
} from "../../../lib/api/products";
import ProductsTable from "../../../components/domain/table/ProductsTable";
import Header from "../../../components/common/Header";

export default function ManagementProductsPage() {
  const { data: products, isLoading: isProductsLoading } = useSWR<
    IGetProduct[]
  >([GET_PRODUCTS_BY_CATEGORY, "all"], () => getProductsByCategory("all"));

  const navigate = useNavigate();
  const handleDoubleClick = (product: IGetProduct) => {
    navigate(`/management/products/${product.key}`);
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="제품 관리" prevLink="/" />
      {/* 테이블 영역 */}
      <div className="flex-1 overflow-hidden">
        {!isProductsLoading && products && (
          <ProductsTable data={products} onDoubleClick={handleDoubleClick} />
        )}
      </div>
    </div>
  );
}
