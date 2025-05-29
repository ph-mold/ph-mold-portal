import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CustomColumnMeta } from "./types";
import { getAlignClass, getPinnedClass } from "./utils";

interface TableProps<T> {
  data?: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  onSelect?: (row: T) => boolean;
  onDoubleClick?: (row: T) => void;
  sortable?: boolean;
  fullWidth?: boolean;
}

export default function Table<T>({
  data = [],
  columns,
  onDoubleClick,
  sortable = true,
  fullWidth = true,
}: TableProps<T>) {
  const initialPinnedColumns = useMemo(() => {
    const pinnedLeft: string[] = [];
    const pinnedRight: string[] = [];

    columns.forEach((col) => {
      const pinAlign = (col.meta as CustomColumnMeta)?.pinAlign;
      if (pinAlign === "left") {
        pinnedLeft.push(col.id as string);
      } else if (pinAlign === "right") {
        pinnedRight.push(col.id as string);
      }
    });

    return { left: pinnedLeft, right: pinnedRight };
  }, [columns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable && { getSortedRowModel: getSortedRowModel() }),
    state: {
      columnPinning: initialPinnedColumns,
    },
  });

  const { rows } = table.getRowModel();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 64,
    count: rows.length,
    overscan: 10,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div ref={tableContainerRef} className="flex-1 overflow-auto size-full">
      <table className={clsx("border-collapse", { "w-full": fullWidth })}>
        <thead className="sticky top-0 bg-background z-20 shadow-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="size-full" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { className, style } = getPinnedClass(header);
                return (
                  <th
                    key={header.id}
                    className={clsx(
                      `px-2 text-xs first:pl-8 last:pr-8 py-4 transition-[width] bg-background border-r border-background2`,
                      className
                    )}
                    style={{ ...style, width: `${header.getSize()}px` }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div
                      className={clsx(
                        "relative flex flex-row w-fit items-center gap-1 text-right select-none text-nowrap",
                        getAlignClass(header)
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {sortable && (
                        <div className="h-fit">
                          {
                            {
                              asc: (
                                <ChevronUp
                                  size={12}
                                  className="text-signature"
                                />
                              ),
                              desc: (
                                <ChevronDown
                                  size={12}
                                  className="text-signature"
                                />
                              ),
                            }[header.column.getIsSorted() as string]
                          }
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody style={{ height: totalSize }}>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;
            return (
              <tr
                data-index={virtualRow.index}
                key={row.id}
                ref={(node) => rowVirtualizer.measureElement(node)}
                className="h-12 group relative"
                onDoubleClick={() =>
                  onDoubleClick && onDoubleClick(row.original)
                }
              >
                {row.getVisibleCells().map((cell) => {
                  const { className, style } = getPinnedClass(cell);
                  return (
                    <td
                      key={cell.id}
                      className={clsx(
                        `px-2 first:rounded-l-lg first:pl-8 last:rounded-r-lg last:pr-8 bg-background group-hover:bg-background2 border border-background2 font-medium`,
                        className
                      )}
                      style={style}
                    >
                      <div
                        className={clsx("w-fit", getAlignClass(cell), {
                          "text-nowrap": !fullWidth,
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
