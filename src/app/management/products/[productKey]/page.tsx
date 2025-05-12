import { Button, Input } from "@ph-mold/ph-ui";
import { ChevronLeft, PlusSquareIcon, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { IGetProductInfo, ISpecType } from "../../../../lib/types/product";
import {
  GET_PRODUCT_INFO_BY_KEY,
  getProductInfoByKey,
} from "../../../../lib/api/products";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AddSpecModal from "../../../../components/management/products/AddSpecModal";

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();

  const { data: product, isLoading: isProductLoading } = useSWR<
    IGetProductInfo | undefined
  >(productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null, () =>
    getProductInfoByKey(productKey)
  );

  const {
    register,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGetProductInfo>({ mode: "onChange" });
  const {
    fields: specs,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specs",
  });

  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
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

  const [open, setOpen] = useState(false);

  const handleOnOpenSpecModal = () => {
    setOpen(true);
  };

  const hanldOnAddSpecType = (spec: ISpecType) => {
    appendSpec({ value: "", specType: spec });
  };

  return (
    <>
      <AddSpecModal
        open={open}
        setOpen={setOpen}
        addSpecTypeAction={hanldOnAddSpecType}
      />
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

        <div className="flex-1 overflow-y-scroll">
          {!isProductLoading && (
            <div className="grid grid-cols-2 relative">
              <div className="h-full">test</div>
              <div className="max-w-[400px] m-4 flex gap-1 flex-col">
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
                <div className="border-signature border rounded-lg p-4">
                  <div className="mb-4 flex flex-row justify-between items-center">
                    <p className="text-foreground2">스펙</p>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<PlusSquareIcon />}
                      onClick={handleOnOpenSpecModal}
                    >
                      추가
                    </Button>
                  </div>
                  <div className="gap-2 flex flex-col">
                    {specs.map((spec, idx) => (
                      <div key={spec.id} className="flex gap-2 items-center">
                        <Input
                          className="flex-1"
                          label={spec.specType.label}
                          placeholder={`단위: ${spec.specType.unit}`}
                          endIcon={<span>{spec.specType.unit}</span>}
                          {...register(`specs.${idx}.value`)}
                        />
                        <Button
                          className="mt-6"
                          onClick={() => removeSpec(idx)}
                          variant="text"
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
