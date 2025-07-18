import { Button } from "@ph-mold/ph-ui";
import { PlusSquareIcon, X } from "lucide-react";
import { useState } from "react";
import { IGetProductInfo } from "@/lib/types/product";
import { ITag } from "@/lib/types/tag";
import { FormikErrors } from "formik";
import { AddTagModal } from "./";

type Props = {
  values: IGetProductInfo;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IGetProductInfo>>;
};

export function TagEditor({ values, setFieldValue }: Props) {
  const [openAddTag, setOpenAddTag] = useState(false);

  const handleRemove = (idx: number) => {
    const current = values?.tags?.[idx];
    if (current?.flag === "new") {
      setFieldValue(
        "tags",
        values?.tags?.filter((_, i) => i !== idx)
      );
    } else {
      setFieldValue(
        "tags",
        values?.tags?.map((tag, i) =>
          i === idx ? { ...tag, flag: "delete" } : tag
        )
      );
    }
  };

  return (
    <>
      <AddTagModal
        open={openAddTag}
        setOpen={setOpenAddTag}
        addTagAction={(tag: ITag) =>
          setFieldValue("tags", [
            ...(values?.tags ?? []),
            {
              ...tag,
              flag: "new",
            },
          ])
        }
      />
      <div className="flex flex-wrap space-y-1 space-x-1 py-2">
        {values?.tags
          ?.map((tag, idx) => ({ tag, idx }))
          .filter(({ tag }) => tag.flag !== "delete")
          .map(({ tag, idx }) => (
            <p
              key={tag.key}
              className="group bg-background2 text-signature h-7 rounded-md px-2 py-1 text-sm text-nowrap flex items-center gap-2 hover:bg-error hover:text-white transition-colors"
            >
              {tag.name}
              <X
                size={16}
                onClick={() => handleRemove(idx)}
                className="cursor-pointer"
              />
            </p>
          ))}
        <Button
          className="group h-7 rounded-md !px-2 !py-1 !text-sm !bg-signature/20"
          variant="text"
          size="small"
          onClick={() => setOpenAddTag(true)}
          startIcon={<PlusSquareIcon size={16} />}
        >
          태그 추가
        </Button>
      </div>
    </>
  );
}
