import { ISampleRequest } from "@/lib/types/sample-request";
import { FileText } from "lucide-react";

interface Props {
  req: ISampleRequest;
}

export function RemarksCard({ req }: Props) {
  if (!req.remarks) return null;

  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-border-strong">
      <h3 className="text-lg font-semibold text-foreground mb-4">비고</h3>

      <div className="flex items-start gap-2">
        <FileText size={16} className="text-foreground2 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {req.remarks}
        </p>
      </div>
    </section>
  );
}
