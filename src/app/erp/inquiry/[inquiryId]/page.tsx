import { Card } from "@/components/common/Card";
import {
  InquiryInfo,
  InquiryReply,
  InquiryStatusManager,
} from "@/components/features/inquiry/detail";
import { IInquiry, InquiryStatus } from "@/lib/types/inquiry";
import { useHeader } from "@/hooks/useHeader";
import {
  GET_INQUIRIES_PAGINATED,
  GET_INQUIRY_BY_ID,
  getInquiryById,
  patchInquiryStatus,
  postInquiryReply,
} from "@/lib/api/inquiry";
import useSWR, { mutate } from "swr";
import { useParams } from "react-router-dom";
import { invalidateQueryByPattern } from "@/utils/queryCache";
import { useAlert } from "@ph-mold/ph-ui";
import { STATUS_MAP } from "@/components/features/inquiry";

function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_MAP[status].color} border ${STATUS_MAP[status].borderColor}`}
    >
      {STATUS_MAP[status].label}
    </span>
  );
}

export default function InquiryDetailPage() {
  useHeader({
    title: "문의 상세",
    prevLink: "/erp/inquiry",
  });

  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { data, isLoading } = useSWR<IInquiry | undefined>(
    inquiryId ? [GET_INQUIRY_BY_ID, inquiryId] : null,
    () => getInquiryById(inquiryId)
  );

  const alert = useAlert();

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!inquiryId) return;
    await patchInquiryStatus(inquiryId, newStatus)
      .then(() => {
        mutate([GET_INQUIRY_BY_ID, inquiryId]);
        invalidateQueryByPattern(GET_INQUIRIES_PAGINATED);
        alert({
          title: "문의 상태 변경 성공",
          description: (
            <p className="flex items-center gap-2">
              문의 상태가 <InquiryStatusBadge status={newStatus} />로
              변경되었습니다.
            </p>
          ),
          acceptLabel: "확인",
          showCancelButton: false,
        });
      })
      .catch((error) => {
        alert({
          title: "문의 상태 변경 실패",
          description: error.message,
          acceptLabel: "확인",
          showCancelButton: false,
        });
      });
  };

  const handleReplySubmit = async (content: string) => {
    if (!inquiryId) return;
    await postInquiryReply(inquiryId, content)
      .then(() => {
        mutate([GET_INQUIRY_BY_ID, inquiryId]);
        invalidateQueryByPattern(GET_INQUIRIES_PAGINATED);
        alert({
          title: "답변 등록 성공",
          description: "답변이 등록되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      })
      .catch((error) => {
        alert({
          title: "답변 등록 실패",
          description: error.message,
          acceptLabel: "확인",
          showCancelButton: false,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl my-4 space-y-4">
          {/* 상태 관리 및 답변 카드 */}
          {!isLoading && data && (
            <Card>
              {/* 상태 관리 섹션 */}
              <InquiryStatusManager
                currentStatus={data.status}
                onStatusChange={handleStatusChange}
              />

              {/* 답변 관리 섹션 */}
              <InquiryReply
                remarks={data.remarks}
                replies={data.replies}
                onReplySubmit={handleReplySubmit}
              />
            </Card>
          )}

          {/* 기존 문의 정보 */}
          {!isLoading && data && (
            <Card topBorder>
              <InquiryInfo detailData={data} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
