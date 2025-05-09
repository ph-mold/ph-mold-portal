import { createColumnHelper } from "@tanstack/react-table";
import { IGetProduct } from "../../../lib/types/product";
import { CustomColumnMeta } from "../../Table/types";
import { Table } from "../../Table";

const columnHelper = createColumnHelper<IGetProduct>();

const getColumns = () => [
  columnHelper.accessor("code", {
    id: "code",
    header: () => <div>코드</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("name", {
    id: "id",
    header: () => <div>이름</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("material", {
    id: "material",
    header: () => <div>소재</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("moq", {
    id: "moq",
    header: () => <div>MOQ</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("tags", {
    id: "tags",
    header: () => <div>태그</div>,
    cell: (info) => (
      <div className="flex flex-wrap space-y-1 space-x-1 py-1">
        {info.getValue().map((tag) => (
          <p
            key={tag.key}
            className="bg-background2 text-signature h-6 rounded-md px-1 py-[1px] text-sm text-nowrap"
          >
            {tag.name}
          </p>
        ))}
      </div>
    ),
    meta: { align: "left" } as CustomColumnMeta,
  }),
];
interface Props {
  data: IGetProduct[];
}

export default function ProductsTable({ data }: Props) {
  return <Table<IGetProduct> data={data} columns={getColumns()} />;
}
