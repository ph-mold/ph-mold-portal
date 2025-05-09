import { Link, useNavigate } from "react-router-dom";
import { IGetProduct } from "../../../lib/types/product";
import { Button } from "@ph-mold/ph-ui";
import useSWR from "swr";
import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory,
} from "../../../lib/api/products";
import ProductsTable from "../../../components/domain/table/ProductsTable";
import { ChevronLeft } from "lucide-react";

export default function ManagementProductsPage() {
  const { data: products, isLoading: isProductsLoading } = useSWR<
    IGetProduct[]
  >([GET_PRODUCTS_BY_CATEGORY, "all"], () => getProductsByCategory("all"));

  const navigate = useNavigate();
  const handleDoubleClick = (product: IGetProduct) => {
    navigate(`/management/products/${product.key}`);
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden py-2">
      {/* 타이틀 영역 */}
      <div className="flex gap-2 items-center mx-2 shrink-0">
        <Link to="/">
          <Button className="!p-1" variant="text">
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="text-2xl">제품 관리</h1>
      </div>

      {/* 테이블 영역 */}
      <div className="flex-1 overflow-hidden">
        {!isProductsLoading && products && (
          <ProductsTable data={products} onDoubleClick={handleDoubleClick} />
        )}
      </div>
    </div>
  );
}
