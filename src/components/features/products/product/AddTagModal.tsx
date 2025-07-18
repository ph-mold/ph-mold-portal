import { Modal } from "@ph-mold/ph-ui";
import { PlusSquare } from "lucide-react";
import useSWR from "swr";
import { ITag } from "@/lib/types/tag";
import { GET_TAGS, getTags } from "@/lib/api/tags";
import { TagsTable } from "@/components/features/tag";

interface Props {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  addTagAction?: (tag: ITag) => void;
}

export function AddTagModal({ open, setOpen, addTagAction }: Props) {
  const { data } = useSWR<ITag[]>([GET_TAGS], getTags);

  const handleOnDoubleClick = (tag: ITag) => {
    addTagAction?.(tag);
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      title={
        <div className="text-signature flex items-center gap-1">
          <PlusSquare />
          태그 추가
        </div>
      }
      bodyClassName="!p-0 !overflow-y-hidden mb-3"
      className="!min-w-[520px]"
    >
      <div className="overflow-y-hidden h-[480px]">
        <TagsTable data={data} onDoubleClick={handleOnDoubleClick} />
      </div>
    </Modal>
  );
}
