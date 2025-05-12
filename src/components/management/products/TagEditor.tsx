import { Button } from "@ph-mold/ph-ui";
import { PlusSquareIcon, X } from "lucide-react";
import { FieldArrayWithId } from "react-hook-form";
import { IGetProductInfo } from "../../../lib/types/product";

interface Props {
  tags: FieldArrayWithId<IGetProductInfo, "tags", "id">[];
  remove: (index: number) => void;
  openAddTagModal: () => void;
}

export default function TagEditor({ tags, remove, openAddTagModal }: Props) {
  return (
    <div className="border-signature border rounded-lg px-4 pt-2 pb-4">
      <div className="flex flex-row justify-between items-center mb-2">
        <p className="text-foreground2">태그</p>
        <Button
          variant="text"
          size="small"
          startIcon={<PlusSquareIcon />}
          onClick={openAddTagModal}
        >
          추가
        </Button>
      </div>
      <div className="gap-2 flex flex-row flex-wrap ">
        {tags.map((tag, idx) => (
          <p
            key={tag.key}
            className="group bg-background2 text-signature h-7 rounded-md px-2 py-1 text-sm text-nowrap flex items-center gap-2 hover:bg-error hover:text-white transition-colors"
          >
            {tag.name}
            <X
              size={16}
              onClick={() => remove(idx)}
              className="cursor-pointer"
            />
          </p>
        ))}
      </div>
    </div>
  );
}
