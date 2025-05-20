import {
  Control,
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { IGetProductInfo } from "../../../lib/types/product";
import { Input } from "@ph-mold/ph-ui";
import TagEditor from "./TagEditor";
import SpecEditor from "./SpecEditor";

interface Props {
  register: UseFormRegister<IGetProductInfo>;
  control: Control<IGetProductInfo, unknown, IGetProductInfo> | undefined;
  errors: FieldErrors<IGetProductInfo>;
  product: IGetProductInfo | undefined;
  tagsField: UseFieldArrayReturn<IGetProductInfo, "tags", "fieldId">;
  specsField: UseFieldArrayReturn<IGetProductInfo, "specs", "fieldId">;
}

export default function ProductInfoPanel({
  register,
  control,
  errors,
  product,
  tagsField,
  specsField,
}: Props) {
  return (
    <>
      {product && (
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-foreground2 text-sm">{product.code}</p>
            <Input
              required
              fullWidth
              placeholder="예) 3ml PP 주사기"
              className="[&>*]:!p-0 [&>*]:!border-signature/30"
              {...register("name", { required: "제품명을 입력해주세요." })}
              error={!!errors.name}
              helperText={errors.name?.message}
              inputClassName="text-lg font-bold"
              variant="outlined"
            />
            <TagEditor field={tagsField} />
          </div>
          <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-row justify-between">
              <p className="text-sm font-semibold">재질</p>
              <p className="text-sm">{product.material}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm font-semibold">제조국</p>
              <p className="text-sm">{product.origin}</p>
            </div>
            <div className="gap-2 flex flex-col ">
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm font-semibold h-fit">
                  최소 주문 수량 (MOQ)
                </p>
                <Input
                  required
                  type="number"
                  className="[&>*]:!p-1 !w-50 [&>*]:!border-signature/30 "
                  inputClassName="text-sm text-right"
                  placeholder="예) 10000"
                  {...register("moq", {
                    required: "MOQ를 입력해주세요.",
                    validate: (v: number) =>
                      v > 0 || "1개 이상의 수량을 입력해주세요.",
                  })}
                  error={!!errors.moq}
                  helperText={errors.moq?.message}
                  variant="outlined"
                />
              </div>
              <SpecEditor
                register={register}
                field={specsField}
                control={control}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
