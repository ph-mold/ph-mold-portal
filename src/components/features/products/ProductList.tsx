import { Pagination } from "@ph-mold/ph-ui";
import { IGetProduct } from "@/lib/types/product";
import { ProductItem } from "./ProductItem";

interface Props {
  currentItems: IGetProduct[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleOnClick: (product: IGetProduct) => void;
}

export function ProductList({
  currentItems,
  currentPage,
  totalPages,
  handlePageChange,
  handleOnClick,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2  lg:grid-cols-4">
        {currentItems.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleOnClick={handleOnClick}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
