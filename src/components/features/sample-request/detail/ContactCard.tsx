import { ISampleRequest } from "@/lib/types/sample-request";
import { Mail, Phone } from "lucide-react";

interface Props {
  req: ISampleRequest;
}

export function ContactCard({ req }: Props) {
  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-border-strong">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        연락처 정보
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <Mail size={16} />
            <span className="text-sm font-medium">이메일</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-foreground break-all">{req.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground2">
            <Phone size={16} />
            <span className="text-sm font-medium">전화번호</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <span className="text-sm text-foreground">{req.phone}</span>
        </div>
      </div>
    </section>
  );
}
