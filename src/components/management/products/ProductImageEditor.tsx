import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFieldArrayReturn } from "react-hook-form";
import { IMAGE_BASE_URL } from "../../../lib/constants/api";
import { IGetProductImage, IGetProductInfo } from "../../../lib/types/product";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Star,
  X,
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Button } from "@ph-mold/ph-ui";

interface Props {
  field: UseFieldArrayReturn<IGetProductInfo, "images", "fieldId">;
}

export default function ProductImageEditor({ field }: Props) {
  const [localImages, setLocalImages] = useState<IGetProductImage[]>([]);

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

  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background2 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
        {renderedImages?.length === 0 ? (
          <ImageOff className="stroke-signature size-[30%] stroke-[1.5] object-contain opacity-30" />
        ) : (
          <>
            <Swiper
              loop={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              spaceBetween={16}
              slidesPerView={1}
              direction="horizontal"
              className="w-full h-full"
            >
              {renderedImages?.map((img, idx) => (
                <SwiperSlide key={idx} className="relative size-full">
                  <img
                    src={`${IMAGE_BASE_URL}${img.url}`}
                    alt={`thumb-${img.id}`}
                    className="object-contain w-full h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Button
              onClick={() => swiperRef.current?.slidePrev()}
              variant="text"
              size="large"
              className="absolute top-1/2 left-2 z-1 -translate-y-1/2 !p-3"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => swiperRef.current?.slideNext()}
              variant="text"
              size="large"
              className="absolute top-1/2 right-2 z-1 -translate-y-1/2 !p-3"
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {renderedImages?.map((img, idx) => (
          <Button
            key={idx}
            variant="text"
            className={`relative overflow-hidden group !bg-background2 aspect-square border-2 !p-0 ${
              idx === currentIndex ? "border-signature" : "border-transparent"
            }`}
          >
            <>
              <img
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                src={`${IMAGE_BASE_URL}${img.url}`}
                alt={`thumb-${img.id}`}
                className="object-cover w-full h-full"
                style={{ objectFit: "contain" }}
              />
              {idx === 0 ? (
                <div className="absolute top-1 left-1 bg-yellow-400 text-white p-0.5 text-xs rounded flex items-center gap-1 shadow">
                  <Star size={12} />
                </div>
              ) : (
                <div className="absolute top-1 left-1 bg-signature text-white px-1.5 py-0.5 text-xs rounded flex items-center gap-1 shadow">
                  {img.sortOrder}
                </div>
              )}

              <X
                size={20}
                className="absolute top-1 right-1 text-error cursor-pointer bg-white rounded-full p-0.5 shadow-md hidden group-hover:block"
                onClick={() => handleRemove(idx)}
              />

              <div className="absolute bottom-1 left-1 gap-1 hidden group-hover:flex">
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
            </>
          </Button>
        ))}
        <ImageUploader onUpload={handleOnUpload} />
      </div>
    </div>
  );
}
