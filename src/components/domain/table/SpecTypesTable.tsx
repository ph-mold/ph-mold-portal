import { createColumnHelper } from "@tanstack/react-table";
import { ISpecType } from "../../../lib/types/product";
import { CustomColumnMeta } from "../../Table/types";
import { Table } from "../../Table";

const columnHelper = createColumnHelper<ISpecType>();

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
  columnHelper.accessor("label", {
    id: "label",
    header: () => <div>이름(보여지는 이름)</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor("unit", {
    id: "unit",
    header: () => <div>단위</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
];
interface Props {
  data?: ISpecType[];
  onDoubleClick?: (row: ISpecType) => void;
}

export default function SpecTypesTable({ data, onDoubleClick }: Props) {
  return (
    <Table<ISpecType>
      data={data}
      columns={getColumns()}
      onDoubleClick={onDoubleClick}
    />
  );
}
