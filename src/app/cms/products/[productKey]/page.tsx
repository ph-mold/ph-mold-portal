import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { useEffect, useRef, useState } from "react";
import { Button, useAlert, WithSkeleton } from "@ph-mold/ph-ui";
import { IGetProductImage, IGetProductInfo } from "@/lib/types/product";
import {
  GET_PRODUCT_IMAGES_BY_KEY,
  GET_PRODUCT_INFO_BY_KEY,
  getProductImagesByKey,
  getProductInfoByKey,
  patchProduct,
} from "@/lib/api/products";
import ProductImageEditor from "@/components/features/products/ProductImageEditor";
import ProductInfoPanel from "@/components/features/products/ProductInfoPanel";
import { useHeader } from "@/hooks/useHeader";
import { Pencil } from "lucide-react";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import { AxiosError } from "axios";
import ProductImageGallerySkeleton from "@/components/features/products/ProductImageGallery.skeleton";
import ProductInfoPanelSkeleton from "@/components/features/products/ProductInfoPanel.skeleton";

const validate = yup.object({
  name: yup.string().required("제품명을 입력해주세요."),
  moq: yup
    .number()
    .required("MOQ를 입력해주세요.")
    .min(1, "1개 이상의 수량을 입력해주세요."),
  specs: yup.array().of(
    yup.object({
      value: yup.string().required("스펙 값을 입력해주세요."),
    })
  ),
});

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();

  const { data: product, isLoading: isLoadingProduct } = useSWR<
    IGetProductInfo | undefined
  >(productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null, () =>
    getProductInfoByKey(productKey)
  );

  const { data: images, isLoading: isLoadingImages } = useSWR<
    IGetProductImage[] | undefined
  >(productKey ? [GET_PRODUCT_IMAGES_BY_KEY, productKey] : null, () =>
    getProductImagesByKey(productKey)
  );

  const formikRef = useRef<FormikProps<IGetProductInfo> | null>(null);

  const [initFormValues, setInitFormValues] = useState<IGetProductInfo>({
    name: "",
    moq: 0,
    specs: [],
    tags: [],
    images: [],
  });

  useEffect(() => {
    if (product && images) {
      setInitFormValues({
        name: product.name,
        moq: product.moq,
        specs: product.specs,
        tags: product.tags,
        images: images ?? [],
      });
    }
  }, [product, images]);

  const alert = useAlert();

  const handleOnModify = () => {
    if (!formikRef) return;
    alert({
      description: "제품 정보를 수정하시겠습니까?",
      onAccept: () => formikRef.current?.submitForm(),
      acceptLabel: "수정",
      cancelLabel: "취소",
    });
  };

  useHeader({
    title: product && product.name,
    prevLink: "/cms/products",
    rightSlot: (
      <Button
        variant="outlined"
        className="mx-2"
        size="small"
        startIcon={<Pencil size={16} />}
        onClick={handleOnModify}
      >
        제품 수정
      </Button>
    ),
  });

  const handleOnSubmit = async (values: IGetProductInfo) => {
    try {
      if (!product) return;
      await patchProduct(product.id!, values);
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
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="mx-auto mb-10 flex w-full max-w-[1080px] flex-col gap-10 px-4 md:px-10">
        <Formik<IGetProductInfo>
          initialValues={initFormValues}
          onSubmit={handleOnSubmit}
          validationSchema={validate}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          innerRef={formikRef}
        >
          {(props) => (
            <Form className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12">
              <WithSkeleton
                isLoading={isLoadingImages}
                skeleton={<ProductImageGallerySkeleton />}
              >
                <ProductImageEditor {...props} />
              </WithSkeleton>
              <WithSkeleton
                isLoading={isLoadingProduct}
                skeleton={<ProductInfoPanelSkeleton />}
              >
                <ProductInfoPanel product={product} {...props} />
              </WithSkeleton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
