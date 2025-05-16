import { Button, Input } from "@ph-mold/ph-ui";
import { PlusSquareIcon } from "lucide-react";
import {
  Control,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { IGetProductInfo, ISpecType } from "../../../lib/types/product";
import AddSpecModal from "./AddSpecModal";
import { useState } from "react";

interface Props {
  register: UseFormRegister<IGetProductInfo>;
  control: Control<IGetProductInfo, unknown, IGetProductInfo> | undefined;
  field: UseFieldArrayReturn<IGetProductInfo, "specs", "fieldId">;
}

export default function SpecEditor({ register, control, field }: Props) {
  const [openAddSpec, setOpenAddSpec] = useState(false);

  const specs = useWatch({ control, name: "specs" });

  const handleValueChange = (idx: number, newValue: string) => {
    const current = specs?.[idx];
    if (!current) return;

    const original = field.fields[idx];
    const isChanged = newValue !== original.value;

    if (isChanged && current.flag !== "new") {
      field.update(idx, { ...current, value: newValue, flag: "update" });
    }
  };

  const handleRemove = (idx: number) => {
    const current = field.fields[idx];
    if (current.flag === "new") {
      field.remove(idx);
    } else {
      field.update(idx, { ...current, flag: "delete" });
    }
  };

  return (
    <>
      <AddSpecModal
        open={openAddSpec}
        setOpen={setOpenAddSpec}
        addSpecTypeAction={(spec: ISpecType) =>
          field.append({ value: "", specType: spec, flag: "new" })
        }
      />
      <div className="border-signature border rounded-lg px-4 pt-2 pb-4">
        <div className="mb-4 flex flex-row justify-between items-center">
          <p className="text-foreground2">스펙</p>
          <Button
            variant="text"
            size="small"
            startIcon={<PlusSquareIcon />}
            onClick={() => setOpenAddSpec(true)}
          >
            추가
          </Button>
        </div>
        <div className="gap-2 flex flex-col">
          {field.fields
            .map((spec, idx) => ({ spec, idx }))
            .filter(({ spec }) => spec.flag !== "delete")
            .map(({ spec, idx }) => (
              <div
                key={spec.id || spec.fieldId}
                className="flex gap-2 items-center"
              >
                <Input
                  className="flex-1"
                  label={spec.specType.label}
                  placeholder={`단위: ${spec.specType.unit}`}
                  endIcon={<span>{spec.specType.unit}</span>}
                  defaultValue={spec.value}
                  {...register(`specs.${idx}.value`)}
                  onBlur={(e) => handleValueChange(idx, e.target.value)}
                />
                <Button
                  className="mt-6"
                  onClick={() => handleRemove(idx)}
                  variant="text"
                >
                  삭제
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
