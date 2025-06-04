import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { ITag } from "../../../lib/types/tag";
import { CustomColumnMeta } from "../../Table/types";
import { Table } from "../../Table";
import { Button } from "@ph-mold/ph-ui";
import { Pencil, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<ITag>();

const getColumns = (
  onEdit?: (tag: ITag) => void,
  onDelete?: (tag: ITag) => void,
  showActions?: boolean
) => {
  const columns: ColumnDef<ITag, string>[] = [
    columnHelper.accessor("name", {
      id: "name",
      size: 200,
      header: () => <div>이름</div>,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("key", {
      id: "key",
      size: 200,
      header: () => <div>키</div>,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
  ];

  if (showActions) {
    columns.push(
      columnHelper.display({
        id: "actions",
        size: 100,
        header: () => <div>관리</div>,
        cell: (info) => (
          <div className="flex gap-2">
            <Button
              variant="text"
              size="small"
              onClick={() => onEdit?.(info.row.original)}
              startIcon={<Pencil className="size-4" />}
            >
              수정
            </Button>
            <Button
              variant="text"
              size="small"
              color="error"
              onClick={() => onDelete?.(info.row.original)}
              startIcon={<Trash2 className="size-4" />}
            >
              삭제
            </Button>
          </div>
        ),
        meta: { align: "center" } as CustomColumnMeta,
      })
    );
  }

  return columns;
};

interface Props {
  data?: ITag[];
  onEdit?: (tag: ITag) => void;
  onDelete?: (tag: ITag) => void;
  onDoubleClick?: (tag: ITag) => void;
  showActions?: boolean;
}

export default function TagsTable({
  data = [],
  onEdit,
  onDelete,
  onDoubleClick,
  showActions = false,
}: Props) {
  return (
    <Table<ITag>
      data={data}
      columns={getColumns(onEdit, onDelete, showActions)}
      onDoubleClick={onDoubleClick}
    />
  );
}
