import { formatCount, formatKoreanDateTime } from "@/utils/format";
import { ISampleRequest } from "@/lib/types/sample-request";
import { User, Building, Package, Calendar } from "lucide-react";

interface Props {
  req: ISampleRequest;
}

export function SummaryCard({ req }: Props) {
  return (
    <section className="p-4 sm:!p-6 border-b border-border-strong">
      <h2 className="text-lg font-semibold text-foreground mb-4">요청 요약</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <User size={16} />
            <span className="text-sm font-medium">신청자</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-foreground">{req.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <Building size={16} />
            <span className="text-sm font-medium">회사</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-signature font-semibold">
            {req.company}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <Package size={16} />
            <span className="text-sm font-medium">요청 수량</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-signature font-semibold">
            {formatCount(req.quantity)} 개
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <Calendar size={16} />
            <span className="text-sm font-medium">요청일시</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-foreground">
            {formatKoreanDateTime(req.createdAt.toString())}
          </span>
        </div>
      </div>
    </section>
  );
}
