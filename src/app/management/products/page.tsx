import { Link } from "react-router-dom";
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

  return (
    <>
      <div>제품 관리</div>
      {!isProductsLoading && products && <ProductsTable data={products} />}
      <Link to="/">홈으로</Link>
    </>
  );
}
