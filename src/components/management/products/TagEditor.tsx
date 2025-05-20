import { Button } from "@ph-mold/ph-ui";
import { PlusSquareIcon, X } from "lucide-react";
import { UseFieldArrayReturn } from "react-hook-form";
import { IGetProductInfo, ITag } from "../../../lib/types/product";
import { useState } from "react";
import AddTagModal from "./AddTagModal";

interface Props {
  field: UseFieldArrayReturn<IGetProductInfo, "tags", "fieldId">;
}

export default function TagEditor({ field }: Props) {
  const [openAddTag, setOpenAddTag] = useState(false);

  const handleRemove = (idx: number) => {
    const current = field.fields[idx];
    if (current.flag === "new") {
      field.remove(idx);
    } else {
      field.update(idx, {
        ...current,
        flag: "delete",
      });
    }
  };

  return (
    <>
      <AddTagModal
        open={openAddTag}
        setOpen={setOpenAddTag}
        addTagAction={(tag: ITag) =>
          field.append({
            ...tag,
            flag: "new",
          })
        }
      />
      <div className="flex flex-wrap space-y-1 space-x-1 py-2">
        {field.fields
          .map((tag, idx) => ({ tag, idx }))
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
