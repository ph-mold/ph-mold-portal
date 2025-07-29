import { ISampleRequest } from "@/lib/types/sample-request";
import { MapPin } from "lucide-react";

interface Props {
  req: ISampleRequest;
}

export function AddressCard({ req }: Props) {
  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-border-strong">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        배송지 정보
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2 text-foreground2 flex-shrink-0">
            <MapPin size={16} />
            <span className="text-sm font-medium">주소</span>
            <div className="w-px h-4 bg-border-strong mx-2"></div>
          </div>
          <p className="text-sm text-foreground flex-1">{req.address}</p>
        </div>

        {req.detailedAddress && (
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2 text-foreground2 flex-shrink-0">
              <MapPin size={16} />
              <span className="text-sm font-medium">상세주소</span>
              <div className="w-px h-4 bg-border-strong mx-2"></div>
            </div>
            <p className="text-sm text-foreground flex-1">
              {req.detailedAddress}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
