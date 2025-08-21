import { Card } from "@/components/common/Card";
import {
  InquiryInfo,
  InquiryReply,
  InquiryStatusManager,
} from "@/components/features/inquiry/detail";
import { IInquiry, InquiryStatus } from "@/lib/types/inquiry";
import { useHeader } from "@/hooks/useHeader";
import { GET_INQUIRY_BY_ID, getInquiryById } from "@/lib/api/inquiry";
import useSWR from "swr";
import { useParams } from "react-router-dom";

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

  const handleStatusChange = (newStatus: InquiryStatus) => {
    // TODO: 상태 변경 API 호출
    console.log("Status changed to:", newStatus);
  };

  const handleReplySubmit = (content: string) => {
    // TODO: 답변 등록 API 호출
    console.log("Reply submitted:", content);
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
