import { Input } from "@ph-mold/ph-ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IGetProductInfo } from "../../../lib/types/product";

interface Props {
  register: UseFormRegister<IGetProductInfo>;
  errors: FieldErrors<IGetProductInfo>;
  product: IGetProductInfo | undefined;
}

export default function ProductInfoForm({ register, errors, product }: Props) {
  return (
    <>
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
        {...register("moq", {
          required: "MOQ를 입력해주세요.",
          validate: (v: number) => v > 0 || "1개 이상의 수량을 입력해주세요.",
        })}
        error={!!errors.moq}
        helperText={errors.moq?.message}
      />
    </>
  );
}
