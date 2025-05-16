import { createColumnHelper } from "@tanstack/react-table";
import { ITag } from "../../../lib/types/product";
import { CustomColumnMeta } from "../../Table/types";
import { Table } from "../../Table";

const columnHelper = createColumnHelper<ITag>();

const getColumns = () => [
  columnHelper.accessor("id", {
    id: "id",
    header: () => <div>Id</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("key", {
    id: "key",
    header: () => <div>Key</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: () => <div>이름(보여지는 이름)</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
];
interface Props {
  data?: ITag[];
  onDoubleClick?: (row: ITag) => void;
}

export default function TagsTable({ data, onDoubleClick }: Props) {
  return (
    <Table<ITag>
      data={data}
      columns={getColumns()}
      onDoubleClick={onDoubleClick}
    />
  );
}
