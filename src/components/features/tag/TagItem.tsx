import { ITag } from "@/lib/types/tag";
import { Button, Popover } from "@ph-mold/ph-ui";
import { MoreVertical } from "lucide-react";

interface Props {
  tag: ITag;
  onEdit: (tag: ITag) => void;
  onDelete: (tag: ITag) => void;
}

export function TagItem({ tag, onEdit, onDelete }: Props) {
  return (
    <div className="relative border border-border-strong rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-background cursor-pointer group flex items-center justify-between">
      <div className="flex-1 min-w-0 flex items-center gap-4">
        {/* id */}
        <span className="text-xs text-foreground2 bg-background2 border px-2 py-0.5 rounded-full border-border-light">
          #{tag.id}
        </span>
        {/* name & key */}
        <div className="flex flex-row items-center gap-2 min-w-8">
          <span className="font-semibold">{tag.name}</span>
          <span className="text-xs text-foreground2/30">{tag.key}</span>
        </div>
      </div>
      {/* more */}
      <div className="relative z-10 ml-3">
        <Popover
          trigger={
            <Button variant="text" size="small" className="!p-2">
              <MoreVertical size={16} />
            </Button>
          }
          placement="bottom-right"
        >
          <div className="flex flex-col p-2 gap-1 w-40">
            <Button
              variant="text"
              color="secondary"
              size="small"
              className="!py-2.5"
              onClick={() => onEdit(tag)}
            >
              수정
            </Button>
            <Button
              variant="text"
              color="error"
              size="small"
              className="!py-2.5"
              onClick={() => onDelete(tag)}
            >
              삭제
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
}
