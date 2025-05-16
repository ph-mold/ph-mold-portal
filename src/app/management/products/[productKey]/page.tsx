import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Alert, Button } from "@ph-mold/ph-ui";
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
import ProductInfoForm from "../../../../components/management/products/ProductInfoForm";
import SpecEditor from "../../../../components/management/products/SpecEditor";
import TagEditor from "../../../../components/management/products/TagEditor";
import ProductImageManager from "../../../../components/management/products/ProductImageManager";

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();

  const { data: product, isLoading: isProductLoading } = useSWR<
    IGetProductInfo | undefined
  >(productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null, () =>
    getProductInfoByKey(productKey)
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

  const handleOnSubmit = async () => {
    const values = getValues();

    try {
      if (!product) return;
      await patchProduct(product.id, values);
      setIsConfirmOpen(false);
      mutate([GET_PRODUCT_IMAGES_BY_KEY, product.key]);
      mutate([GET_PRODUCT_INFO_BY_KEY, product.key]);
      alert("수정되었습니다.");
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    }
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <Alert
        description="제품 정보를 수정하시겠습니까?"
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        acceptLabel="수정"
        cancelLabel="취소"
        onAccept={handleOnSubmit}
      />
      <div className="flex flex-col h-screen overflow-hidden py-2">
        <div className="flex gap-2 items-center mx-2 shrink-0">
          <Link to="/management/products">
            <Button className="!p-1" variant="text">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-2xl">제품 관리</h1>
          <Button onClick={() => setIsConfirmOpen(true)} variant="text">
            수정
          </Button>
        </div>

        <div className=" h-full overflow-hidden">
          {!isProductLoading && (
            <div className="grid grid-cols-[auto_1fr] relative h-full">
              <div className="min-w-[400px] p-4 flex gap-2 flex-col overflow-y-auto">
                <ProductInfoForm
                  register={register}
                  errors={errors}
                  product={product}
                />
                <SpecEditor
                  register={register}
                  field={specsField}
                  control={control}
                />
                <TagEditor field={tagsField} />
              </div>
              <div className="h-full overflow-y-auto">
                <ProductImageManager field={imagesField} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
