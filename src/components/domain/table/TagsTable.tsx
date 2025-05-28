import { createColumnHelper } from "@tanstack/react-table";
import { ITag } from "../../../lib/types/product";
import { Table } from "../../Table";

const columnHelper = createColumnHelper<ITag>();

const getColumns = () => [
  columnHelper.accessor("id", {
    id: "id",
    size: 40,
    header: () => <div>Id</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("key", {
    id: "key",
    header: () => <div>Key</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: () => <div>이름(보여지는 이름)</div>,
    cell: (info) => info.getValue(),
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
