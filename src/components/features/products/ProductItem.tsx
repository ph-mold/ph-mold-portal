import { IGetProduct } from "@/lib/types/product";
import { ImageOff } from "lucide-react";
import { IMAGE_BASE_URL } from "@/lib/constants/api";

interface Props {
  product: IGetProduct;
  handleOnClick: (product: IGetProduct) => void;
}

export function ProductItem({ product, handleOnClick }: Props) {
  return (
    <div
      className="group relative flex flex-col gap-3 cursor-pointer"
      onClick={() => handleOnClick(product)}
    >
      {product.material && (
        <div className="bg-gradient-primary absolute top-2 left-2 z-5 rounded-md bg-gradient-to-r px-2 py-1 text-xs font-medium">
          <span className="text-reverseForeground">{product.material}</span>
        </div>
      )}
      <div className="bg-background2 relative flex aspect-square items-center justify-center overflow-hidden rounded-lg">
        {product.thumbnailImageUrl ? (
          <div className="relative size-full transition-transform duration-200 group-hover:scale-105">
            <img
              src={`${IMAGE_BASE_URL}${product.thumbnailImageUrl}`}
              alt={`thumb-${product.id}`}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <ImageOff className="stroke-signature size-[30%] stroke-[1.5] object-contain opacity-30" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="space-y-1">
          <p className="text-foreground2 text-xs font-medium">{product.code}</p>
          <p className="line-clamp-2 text-sm font-bold">{product.name}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {product.tags?.map((tag) => (
            <p
              key={tag.key}
              className="bg-background2 text-signature rounded-md px-2 py-1 text-xs font-medium"
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
