import { Button } from "@ph-mold/ph-ui";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface IPaginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="text"
        size="small"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="!p-1"
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="!p-1"
      >
        <ChevronLeft />
      </Button>
      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? "contained" : "outlined"}
          size="small"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="text"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="!p-1"
      >
        <ChevronRight />
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="!p-1"
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}
