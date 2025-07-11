import { useMemo, useRef, useState } from "react";
import { IGetProductImage, IGetProductInfo } from "@/lib/types/product";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Star,
  X,
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Button } from "@ph-mold/ph-ui";
import { FormikProps } from "formik";
import { IMAGE_BASE_URL } from "@/lib/constants/api";

type Props = FormikProps<IGetProductInfo>;

export function ProductImageEditor({ values, setFieldValue }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 에디터상 보이는 이미지 목록
  const renderedImages = useMemo(() => {
    return values.images.filter((img) => img.flag !== "delete");
  }, [values.images]);

  const normalizeImages = (inputImages: IGetProductImage[]) => {
    // 1. 삭제되지 않은 이미지만 추출하여 sortOrder 재할당 (0부터)
    const activeImages = inputImages.filter((img) => img.flag !== "delete");
    const orderedImages = activeImages.map((img, idx) => ({
      ...img,
      sortOrder: idx,
      isThumbnail: idx === 0 ? 1 : 0,
    }));

    // 2. 원본 배열을 id 기준으로 업데이트 (delete 플래그는 그대로 유지)
    const finalImages = inputImages.map((img) => {
      if (img.flag === "delete") return img; // delete 플래그는 그대로 유지

      const ordered = orderedImages.find((r) => r.id === img.id);
      if (!ordered) return img; // 삭제된 경우

      // 원본과 비교
      const original = values.images.find((orig) => orig.id === img.id);
      const sortOrderChanged =
        original && original.sortOrder !== ordered.sortOrder;
      const shouldUpdate = sortOrderChanged && img.flag !== "new";

      return {
        ...img,
        sortOrder: ordered.sortOrder,
        isThumbnail: ordered.isThumbnail,
        flag: shouldUpdate ? "update" : img.flag,
      };
    });

    setFieldValue("images", finalImages);
  };

  const handleOnUpload = (paths: string[]) => {
    const lastOrder = renderedImages.length;

    const newImages: IGetProductImage[] = paths.map((path, idx) => ({
      id: Date.now() + Math.random(),
      url: path,
      sortOrder: lastOrder + idx,
      isThumbnail: 0,
      flag: "new",
    }));

    setFieldValue("images", [...values.images, ...newImages]);
  };

  const handleSwap = (from: IGetProductImage, to: IGetProductImage) => {
    const newImages = [...values.images];
    const fromIndex = newImages.findIndex((img) => img.id === from.id);
    const toIndex = newImages.findIndex((img) => img.id === to.id);
    [newImages[fromIndex], newImages[toIndex]] = [
      newImages[toIndex],
      newImages[fromIndex],
    ];
    normalizeImages(newImages);
  };

  const handleRemove = (id?: number) => {
    const newImages = values.images
      .filter((img) => !(img.id === id && img.flag === "new"))
      .map((img) =>
        img.id === id && img.flag !== "new"
          ? { ...img, flag: "delete" as const }
          : img
      );

    normalizeImages(newImages);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background2 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
        {renderedImages.length === 0 ? (
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
              {renderedImages.map((img, idx) => (
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
        {renderedImages.map((img, idx) => (
          <Button
            key={idx}
            variant="text"
            className={`relative overflow-hidden group !bg-background2 aspect-square border-1 !p-0 ${
              idx === currentIndex ? "border-signature" : "border-border-strong"
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
                  {img.sortOrder + 1}
                </div>
              )}

              <X
                size={20}
                className="absolute top-1 right-1 text-error cursor-pointer bg-white rounded-full p-0.5 shadow-md hidden group-hover:block"
                onClick={() => handleRemove(img.id)}
              />

              <div className="absolute bottom-1 left-1 gap-1 hidden group-hover:flex">
                <ArrowLeft
                  size={18}
                  className="cursor-pointer text-black bg-white rounded-full p-0.5 shadow"
                  onClick={() =>
                    handleSwap(renderedImages[idx], renderedImages[idx - 1])
                  }
                />
                <ArrowRight
                  size={18}
                  className="cursor-pointer text-black bg-white rounded-full p-0.5 shadow"
                  onClick={() =>
                    handleSwap(renderedImages[idx], renderedImages[idx + 1])
                  }
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
