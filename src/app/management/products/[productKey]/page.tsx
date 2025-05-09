import { Button, Input } from "@ph-mold/ph-ui";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { IGetProductInfo } from "../../../../lib/types/product";
import {
  GET_PRODUCT_INFO_BY_KEY,
  getProductInfoByKey,
} from "../../../../lib/api/products";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();

  const { data: product, isLoading: isProductLoading } = useSWR<
    IGetProductInfo | undefined
  >(productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null, () =>
    getProductInfoByKey(productKey)
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGetProductInfo>({ mode: "onChange" });
  const {
    fields: specs,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "specs",
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        moq: product.moq,
        specs: product.specs,
        tags: product.tags,
      });
    }
  }, [product, reset]);

  const test = () => {
    console.log(getValues());
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden py-2">
      {/* 타이틀 영역 */}
      <div className="flex gap-2 items-center mx-2 shrink-0">
        <Link to="/management/products">
          <Button className="!p-1" variant="text">
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="text-2xl">제품 관리</h1>
        <Button onClick={test} variant="text">
          저장
        </Button>
      </div>

      {/* 테이블 영역 */}
      <div className="flex-1 overflow-hidden">
        {!isProductLoading && (
          <div className=" max-w-[400px] m-4 flex gap-1 flex-col">
            <Input label="ID" readOnly value={product?.id} />
            <Input label="코드" readOnly value={product?.code} />
            <Input
              required
              label="제품명"
              placeholder="예) 3ml PP 주사기"
              {...register("name", { required: "제품명을 입력해주세요." })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Input
              required
              label="MOQ"
              type="number"
              placeholder="예) 10000"
              defaultValue={product?.moq}
              {...register("moq", {
                required: "샘플 수량을 입력해주세요.",
                validate: (v) => v > 0 || "1개 이상의 수량을 입력해주세요.",
              })}
              error={!!errors.moq}
              helperText={errors.moq?.message}
            />
            {specs.map((spec, idx) => (
              <div key={spec.id} className="flex gap-2 items-center">
                <Input
                  className="flex-1"
                  label={spec.specType.label}
                  placeholder={`단위: ${spec.specType.unit}`}
                  {...register(`specs.${idx}.value`)}
                />
                <Button
                  className="mt-6"
                  onClick={() => remove(idx)}
                  variant="text"
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
