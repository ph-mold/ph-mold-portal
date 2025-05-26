import { useNavigate } from "react-router-dom";
import { IGetProduct } from "../../../lib/types/product";
import useSWR from "swr";
import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory,
} from "../../../lib/api/products";
import ProductsTable from "../../../components/domain/table/ProductsTable";

export default function ManagementProductsPage() {
  const { data: products, isLoading: isProductsLoading } = useSWR<
    IGetProduct[]
  >([GET_PRODUCTS_BY_CATEGORY, "all"], () => getProductsByCategory("all"));

  const navigate = useNavigate();
  const handleDoubleClick = (product: IGetProduct) => {
    navigate(`/management/products/${product.key}`);
  };
  return (
    <div className="flex flex-col h-full">
      {!isProductsLoading && products && (
        <ProductsTable data={products} onDoubleClick={handleDoubleClick} />
      )}
    </div>
  );
}
