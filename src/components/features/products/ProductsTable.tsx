import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/common/Table";
import { CustomColumnMeta } from "@/components/common/Table/types";
import { IGetProduct } from "@/lib/types/product";

const columnHelper = createColumnHelper<IGetProduct>();

const getColumns = () => [
  columnHelper.accessor("code", {
    id: "code",
    size: 50,
    header: () => <div>코드</div>,
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("name", {
    id: "id",
    size: 200,
    header: () => <div>이름</div>,
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("material", {
    id: "material",
    size: 70,
    header: () => <div>소재</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor("moq", {
    id: "moq",
    size: 70,
    header: () => <div>MOQ</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor("tags", {
    id: "tags",
    size: 300,
    header: () => <div>태그</div>,
    cell: (info) => (
      <div className="flex flex-wrap space-y-1 space-x-1 py-1">
        {info.getValue()?.map((tag) => (
          <p
            key={tag.key}
            className="bg-background2 text-signature h-6 rounded-md px-1 py-[1px] text-sm text-nowrap"
          >
            {tag.name}
          </p>
        ))}
      </div>
    ),
  }),
];
interface Props {
  data: IGetProduct[];
  onDoubleClick?: (row: IGetProduct) => void;
}

export default function ProductsTable({ data, onDoubleClick }: Props) {
  return (
    <Table<IGetProduct>
      data={data}
      columns={getColumns()}
      onDoubleClick={onDoubleClick}
    />
  );
}
