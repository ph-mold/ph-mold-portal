import { IMAGE_BASE_URL } from "../../../lib/constants/api";
import { IGetProductImage } from "../../../lib/types/product";
import ImageUploader from "./ImageUploader";

interface ProductImageManagerProps {
  images?: IGetProductImage[];
  tempImages: string[];
  onUpload: (paths: string[]) => void;
}

export default function ProductImageManager({
  images,
  tempImages,
  onUpload,
}: ProductImageManagerProps) {
  const allPaths = [...(images?.map((img) => img.url) ?? []), ...tempImages];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 p-4 gap-4 overflow-y-auto size-fit">
      {allPaths.map((path) => (
        <div
          key={path}
          className="relative aspect-square border border-background2 rounded-xl overflow-hidden"
        >
          <img
            src={`${IMAGE_BASE_URL}${path}`}
            alt={`thumb-${path}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      <ImageUploader onUpload={onUpload} />
    </div>
  );
}
