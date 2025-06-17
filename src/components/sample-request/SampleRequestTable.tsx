import { ISampleRequest } from "../../lib/types/sample-request";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../Table";
import { formatCount, formatKoreanDateTime } from "../../utils/format";
import { CustomColumnMeta } from "../Table/types";

const columnHelper = createColumnHelper<ISampleRequest>();

const getColumns = () => [
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    size: 200,
    header: () => <span>요청 날짜</span>,
    cell: ({ getValue }) => formatKoreanDateTime(getValue().toString()),
  }),
  columnHelper.accessor("company", {
    id: "company",
    size: 100,
    header: () => <span>회사</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    id: "name",
    size: 70,
    header: () => <span>담당자</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    id: "email",
    size: 120,
    header: () => <span>이메일</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    id: "phone",
    size: 150,
    header: () => <span>전화번호</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    id: "address",
    size: 300,
    header: () => <span>주소</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("detailedAddress", {
    id: "detailedAddress",
    size: 150,
    header: () => <span>상세 주소</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    id: "quantity",
    size: 100,
    header: () => <span>갯수</span>,
    cell: (info) => formatCount(info.getValue()),
    meta: { align: "right" } as CustomColumnMeta,
  }),
];

interface Props {
  data?: ISampleRequest[];
  onDoubleClick?: (row: ISampleRequest) => void;
}

export default function SampleRequestTable({ data, onDoubleClick }: Props) {
  return (
    <Table<ISampleRequest>
      fullWidth={false}
      data={data}
      columns={getColumns()}
      onDoubleClick={onDoubleClick}
    />
  );
}
