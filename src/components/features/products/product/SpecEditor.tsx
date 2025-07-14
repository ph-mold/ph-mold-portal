import { Button, Input } from "@ph-mold/ph-ui";
import { IGetProductInfo } from "@/lib/types/product";
import { AddSpecModal } from "./AddSpecModal";
import { useState } from "react";
import { FieldArray, FormikProps } from "formik";
import { ISpecType } from "@/lib/types/spec";

type Props = {
  formikProps: FormikProps<IGetProductInfo>;
};

export function SpecEditor({ formikProps }: Props) {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    formikProps;
  const [openAddSpec, setOpenAddSpec] = useState(false);

  const handleValueChange = (idx: number, newValue: string) => {
    const current = values.specs?.[idx];
    if (!current) return;

    const original = values.specs[idx];
    const isChanged = newValue !== original.value;

    if (isChanged && current.flag !== "new") {
      setFieldValue(`specs.${idx}.value`, newValue);
      setFieldValue(`specs.${idx}.flag`, "update");
    } else if (isChanged && current.flag === "new") {
      setFieldValue(`specs.${idx}.value`, newValue);
    }
  };

  const handleBlur = (idx: number) => {
    setFieldTouched(`specs.${idx}.value`, true, true);
  };

  const handleRemove = (idx: number) => {
    const current = values.specs?.[idx];
    if (current?.flag === "new") {
      // 새로 추가된 항목은 바로 제거
      setFieldValue(
        "specs",
        values.specs?.filter((_, i) => i !== idx)
      );
    } else {
      // 기존 항목은 삭제 플래그만 설정
      setFieldValue(`specs.${idx}.flag`, "delete");
    }
  };

  return (
    <>
      <FieldArray
        name="specs"
        render={({ push, remove }) => (
          <>
            <AddSpecModal
              open={openAddSpec}
              setOpen={setOpenAddSpec}
              addSpecTypeAction={(spec: ISpecType) => {
                const newSpec = { value: "", specType: spec, flag: "new" };
                push(newSpec);
              }}
            />
            {values.specs
              ?.map((spec, idx) => ({ spec, idx }))
              .filter(({ spec }) => spec.flag !== "delete")
              .map(({ spec, idx }) => {
                const specErrors = errors.specs as
                  | Array<{ value?: string }>
                  | undefined;
                const specTouched = touched.specs as
                  | Array<{ value?: boolean }>
                  | undefined;
                const showError =
                  specErrors?.[idx]?.value && specTouched?.[idx]?.value;

                return (
                  <div
                    key={spec.id || `${spec.specType.id}-${idx}`}
                    className="flex flex-row justify-between group"
                  >
                    <div className="flex flex-row items-center">
                      <p className="text-sm font-semibold">
                        {spec.specType.label}
                      </p>
                      <Button
                        variant="text"
                        size="small"
                        color="error"
                        className="!py-1 px-1 ml-4 !hidden group-hover:!block "
                        onClick={() => {
                          const current = values.specs?.[idx];
                          if (current?.flag === "new") {
                            remove(idx);
                          } else {
                            handleRemove(idx);
                          }
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <Input
                        className={`[&>*]:!p-0.5 [&>*]:!border-signature/30 [&>*]:!w-50`}
                        inputClassName="text-sm text-right"
                        endIcon={
                          <span className="text-sm">{spec.specType.unit}</span>
                        }
                        value={spec.value}
                        onChange={(e) => handleValueChange(idx, e.target.value)}
                        onBlur={() => handleBlur(idx)}
                        variant="outlined"
                        error={!!showError}
                        helperText={
                          showError ? specErrors?.[idx]?.value : undefined
                        }
                      />
                    </div>
                  </div>
                );
              })}
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
        )}
      />
    </>
  );
}
