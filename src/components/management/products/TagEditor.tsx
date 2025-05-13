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
      <div className="border-signature border rounded-lg px-4 pt-2 pb-4">
        <div className="flex flex-row justify-between items-center mb-2">
          <p className="text-foreground2">태그</p>
          <Button
            variant="text"
            size="small"
            startIcon={<PlusSquareIcon />}
            onClick={() => setOpenAddTag(true)}
          >
            추가
          </Button>
        </div>
        <div className="gap-2 flex flex-row flex-wrap">
          {field.fields
            .filter((tag) => tag.flag !== "delete")
            .map((tag, idx) => (
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
        </div>
      </div>
    </>
  );
}
