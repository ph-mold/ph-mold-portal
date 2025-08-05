import { CheckCircle2 } from "lucide-react";

export function CompletedStatusBanner() {
  return (
    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            완료된 샘플 요청입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
