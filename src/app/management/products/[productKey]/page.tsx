import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@ph-mold/ph-ui";
import {
  IGetProductImage,
  IGetProductInfo,
} from "../../../../lib/types/product";
import {
  GET_PRODUCT_IMAGES_BY_KEY,
  GET_PRODUCT_INFO_BY_KEY,
  getProductImagesByKey,
  getProductInfoByKey,
  patchProduct,
} from "../../../../lib/api/products";
import { useAlert } from "../../../../recoil/alert/useAlert";
import ProductImageEditor from "../../../../components/management/products/ProductImageEditor";
import ProductInfoPanel from "../../../../components/management/products/ProductInfoPanel";
import Header from "../../../../components/common/Header";
import { AxiosError } from "axios";

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();

  const { data: product } = useSWR<IGetProductInfo | undefined>(
    productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null,
    () => getProductInfoByKey(productKey)
  );

  const { data: images } = useSWR<IGetProductImage[] | undefined>(
    productKey ? [GET_PRODUCT_IMAGES_BY_KEY, productKey] : null,
    () => getProductImagesByKey(productKey)
  );

  const {
    register,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGetProductInfo>({ mode: "onChange" });

  const specsField = useFieldArray({
    control,
    name: "specs",
    keyName: "fieldId",
  });
  const tagsField = useFieldArray({
    control,
    name: "tags",
    keyName: "fieldId",
  });
  const imagesField = useFieldArray({
    control,
    name: "images",
    keyName: "fieldId",
  });

  useEffect(() => {
    if (product && images) {
      reset({
        name: product.name,
        moq: product.moq,
        specs: product.specs,
        tags: product.tags,
        images: images ?? [],
      });
    }
  }, [product, images, reset]);

  const alert = useAlert();

  const handleOnModify = () => {
    alert({
      description: "제품 정보를 수정하시겠습니까?",
      onAccept: handleOnSubmit,
      acceptLabel: "수정",
      cancelLabel: "취소",
    });
  };

  const handleOnSubmit = async () => {
    const values = getValues();

    try {
      if (!product) return;
      await patchProduct(product.id, values);
      mutate([GET_PRODUCT_IMAGES_BY_KEY, product.key]);
      mutate([GET_PRODUCT_INFO_BY_KEY, product.key]);
      alert({
        description: "제품 수정이 완료되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    } catch (e: unknown) {
      const err = e as AxiosError;
      if (err.status !== 403 && err.status !== 401) {
        alert({
          title: "오류",
          description: `${e}`,
          acceptLabel: "닫기",
          showCancelButton: false,
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header
        title={`${product?.name} 제품 관리`}
        prevLink="/management/products"
        components={
          <Button onClick={handleOnModify} variant="text">
            수정
          </Button>
        }
      />
      <div className="mx-auto mb-10 flex w-full max-w-[1080px] flex-col gap-10 px-4 md:px-10">
        <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12">
          <ProductImageEditor field={imagesField} />
          <ProductInfoPanel
            register={register}
            control={control}
            errors={errors}
            product={product}
            tagsField={tagsField}
            specsField={specsField}
          />
        </div>
      </div>
    </div>
  );
}
