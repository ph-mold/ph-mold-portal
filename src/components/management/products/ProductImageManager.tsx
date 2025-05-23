import { useCallback, useEffect, useMemo, useState } from "react";
import { UseFieldArrayReturn } from "react-hook-form";
import { IMAGE_BASE_URL } from "../../../lib/constants/api";
import { IGetProductImage, IGetProductInfo } from "../../../lib/types/product";
import { ArrowLeft, ArrowRight, Star, X } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface ProductImageManagerProps {
  field: UseFieldArrayReturn<IGetProductInfo, "images", "fieldId">;
}

export default function ProductImageManager({
  field,
}: ProductImageManagerProps) {
  const [localImages, setLocalImages] = useState<IGetProductImage[]>([]);

  // 유틸 함수: 정렬, 썸네일, flag 관리
  const applyAndSync = useCallback(
    (updated: IGetProductImage[]) => {
      const newLocal = updated.map((img, i) => ({
        ...img,
        sortOrder: i + 1,
        isThumbnail: i === 0 ? 1 : 0,
      }));

      newLocal.forEach((img, i) => {
        const idx = field.fields.findIndex((f) => f.id === img.id);
        if (idx === -1) return;

        const original = field.fields[idx];
        const hasChanged =
          original.sortOrder !== i + 1 ||
          original.isThumbnail !== (i === 0 ? 1 : 0);
        const shouldFlagUpdate = original.flag !== "new" && hasChanged;

        field.update(idx, {
          ...img,
          sortOrder: i + 1,
          isThumbnail: i === 0 ? 1 : 0,
          flag: shouldFlagUpdate ? "update" : original.flag,
        });
      });

      setLocalImages(newLocal);
    },
    [field]
  );

  // 최초 동기화
  useEffect(() => {
    const valid = field.fields.filter((f) => f.flag !== "delete");
    const sorted = [...valid].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
    applyAndSync(sorted);
  }, [field.fields.length]);

  // 업로드
  const handleOnUpload = useCallback(
    (paths: string[]) => {
      const lastOrder = field.fields
        .filter((img) => img.flag !== "delete")
        .reduce((max, img) => Math.max(max, img.sortOrder ?? 0), 0);

      const newImages: IGetProductImage[] = paths.map((path, idx) => ({
        id: Date.now() + Math.random(),
        url: path,
        sortOrder: lastOrder + idx + 1,
        isThumbnail: 0,
        flag: "new",
      }));

      field.append(newImages);
    },
    [field]
  );

  // 삭제
  const handleRemove = useCallback(
    (idx: number) => {
      const target = localImages[idx];
      const realIdx = field.fields.findIndex((f) => f.id === target.id);
      if (realIdx === -1) return;

      if (target.flag === "new") {
        field.remove(realIdx);
      } else {
        field.update(realIdx, { ...target, flag: "delete" });
      }

      const next = localImages.filter((_, i) => i !== idx);
      applyAndSync(next);
    },
    [localImages, field, applyAndSync]
  );

  // 순서 이동
  const handleSwap = useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= localImages.length) return;

      const reordered = [...localImages];
      [reordered[from], reordered[to]] = [reordered[to], reordered[from]];
      applyAndSync(reordered);
    },
    [localImages, applyAndSync]
  );

  // 렌더링용
  const renderedImages = useMemo(() => {
    return [...localImages].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [localImages]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4 gap-4 overflow-y-auto">
      {renderedImages.map((img, idx) => (
        <div
          key={img.id}
          className="relative aspect-square border border-background2 rounded-xl overflow-hidden group"
        >
          <img
            src={`${IMAGE_BASE_URL}${img.url}`}
            alt={`thumb-${img.id}`}
            className="object-cover w-full h-full"
          />

          {idx === 0 ? (
            <div className="absolute top-1 left-1 bg-yellow-400 text-white px-1.5 py-0.5 text-xs rounded flex items-center gap-1 shadow">
              <Star size={12} /> 썸네일
            </div>
          ) : (
            <div className="absolute top-0 left-0 bg-signature/80 text-sm text-white px-2 py-0.5 rounded-br">
              {img.sortOrder}
            </div>
          )}

          <X
            size={20}
            className="absolute top-1 right-1 text-red-500 cursor-pointer bg-white rounded-full p-0.5 shadow-md hidden group-hover:block"
            onClick={() => handleRemove(idx)}
          />

          <div className="absolute bottom-1 left-1 flex gap-1">
            <ArrowLeft
              size={18}
              className="cursor-pointer text-black bg-white rounded-full p-0.5 shadow"
              onClick={() => handleSwap(idx, idx - 1)}
            />
            <ArrowRight
              size={18}
              className="cursor-pointer text-black bg-white rounded-full p-0.5 shadow"
              onClick={() => handleSwap(idx, idx + 1)}
            />
          </div>
        </div>
      ))}

      <ImageUploader onUpload={handleOnUpload} />
    </div>
  );
}
