import { Button, Input } from "@ph-mold/ph-ui";
import {
  Control,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { IGetProductInfo, ISpecType } from "../../lib/types/product";
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
      <>
        {field.fields
          .map((spec, idx) => ({ spec, idx }))
          .filter(({ spec }) => spec.flag !== "delete")
          .map(({ spec, idx }) => (
            <div
              key={spec.id || spec.fieldId}
              className="flex flex-row justify-between group"
            >
              <div className="flex flex-row items-center">
                <p className="text-sm font-semibold">{spec.specType.label}</p>
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  className="!py-1 px-1 ml-4 !hidden group-hover:!block "
                  onClick={() => handleRemove(idx)}
                >
                  삭제
                </Button>
              </div>
              <Input
                className="[&>*]:!p-0.5 [&>*]:!border-signature/30 [&>*]:!w-50"
                inputClassName="text-sm text-right"
                endIcon={<span className="text-sm">{spec.specType.unit}</span>}
                defaultValue={spec.value}
                {...register(`specs.${idx}.value`)}
                onBlur={(e) => handleValueChange(idx, e.target.value)}
                variant="outlined"
              />
            </div>
          ))}
        <Button
          variant="text"
          size="small"
          className="!bg-signature/20"
          fullWidth
          onClick={() => setOpenAddSpec(true)}
        >
          스펙 추가
        </Button>
      </>
    </>
  );
}
