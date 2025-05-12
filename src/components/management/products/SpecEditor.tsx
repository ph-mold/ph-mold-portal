import { Button, Input } from "@ph-mold/ph-ui";
import { PlusSquareIcon } from "lucide-react";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { IGetProductInfo } from "../../../lib/types/product";

interface Props {
  specs: FieldArrayWithId<IGetProductInfo, "specs", "id">[];
  register: UseFormRegister<IGetProductInfo>;
  remove: (index: number) => void;
  openAddSpecModal: () => void;
}

export default function SpecEditor({
  specs,
  register,
  remove,
  openAddSpecModal,
}: Props) {
  return (
    <div className="border-signature border rounded-lg px-4 pt-2 pb-4">
      <div className="mb-4 flex flex-row justify-between items-center">
        <p className="text-foreground2">스펙</p>
        <Button
          variant="text"
          size="small"
          startIcon={<PlusSquareIcon />}
          onClick={openAddSpecModal}
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
            <Button className="mt-6" onClick={() => remove(idx)} variant="text">
              삭제
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
