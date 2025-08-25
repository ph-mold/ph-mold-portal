import { useState } from "react";
import { Button } from "@ph-mold/ph-ui";
import { CheckCircle2 } from "lucide-react";
import { InquiryStatus } from "@/lib/types/inquiry";
import { STATUS_MAP } from "@/components/features/inquiry/constants";

interface InquiryStatusManagerProps {
  currentStatus: InquiryStatus;
  onStatusChange: (newStatus: InquiryStatus) => Promise<void>;
}

export function InquiryStatusManager({
  currentStatus,
  onStatusChange,
}: InquiryStatusManagerProps) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<InquiryStatus>(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    if (selectedStatus === currentStatus) return;

    setIsLoading(true);
    try {
      await onStatusChange(selectedStatus);
      setIsEditingStatus(false);
    } catch (error) {
      console.error("상태 변경 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b border-border-strong p-4 sm:!p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 size={20} className="text-blue-500" />
        문의 상태 관리
      </h3>

      <div className="flex gap-4 sm:!flex-row flex-col">
        <div className="flex items-center gap-2">
          <span className="text-foreground2 text-sm font-medium">
            현재 상태:
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_MAP[currentStatus].color} border ${STATUS_MAP[currentStatus].borderColor}`}
          >
            {STATUS_MAP[currentStatus].label}
          </span>
        </div>

        {!isEditingStatus ? (
          <Button
            variant="outlined"
            size="small"
            className="w-full sm:!w-auto"
            onClick={() => {
              setSelectedStatus(currentStatus);
              setIsEditingStatus(true);
            }}
          >
            상태 변경
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as InquiryStatus)
              }
              className="rounded-md border border-border-strong px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {Object.entries(STATUS_MAP).map(([key, status]) => (
                <option key={key} value={key}>
                  {status.label}
                </option>
              ))}
            </select>
            <Button
              variant="outlined"
              size="small"
              onClick={handleStatusChange}
              loading={isLoading}
              disabled={isLoading}
            >
              저장
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsEditingStatus(false)}
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
