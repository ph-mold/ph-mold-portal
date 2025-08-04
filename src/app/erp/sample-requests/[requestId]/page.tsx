import { useParams } from "react-router-dom";
import { useHeader } from "@/hooks/useHeader";
import { ISampleRequest } from "@/lib/types/sample-request";
import useSWR from "swr";
import { GET_SAMPLE_REQUEST, getSampleRequest } from "@/lib/api/sample-request";
import {
  CompletedNode,
  ProcessingNode,
  ProcessTimeline,
  RequestReceptionNode,
  ShippedNode,
  useSampleRequestProcess,
} from "@/components/features/sample-request/detail";
import { CompletedStatusBanner } from "@/components/features/sample-request/detail/CompletedStatusBanner";
import { isStatusCompleted } from "@/lib/types/sample-request";

export default function SampleRequestDetailPage() {
  const { requestId } = useParams<{ requestId: string }>();

  const { data: request } = useSWR<ISampleRequest | undefined>(
    requestId ? [GET_SAMPLE_REQUEST, requestId] : null,
    () => getSampleRequest(requestId)
  );

  const { currentNode, completedSteps, handleNodeChange } =
    useSampleRequestProcess(request);

  /* 헤더 설정 */
  useHeader({
    title: "샘플 요청 상세",
    prevLink: "/erp/sample-requests",
  });

  const renderCurrentNode = () => {
    if (!request) return null;

    switch (currentNode) {
      case "reception":
        return <RequestReceptionNode request={request} />;
      case "processing":
        return <ProcessingNode request={request} />;
      case "shipped":
        return <ShippedNode request={request} />;
      case "completed":
        return <CompletedNode request={request} />;
      default:
        return <RequestReceptionNode request={request} />;
    }
  };

  return (
    <>
      {request && (
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 space-y-2">
            {/* 완료 상태 배너 */}
            {isStatusCompleted(request.status, "completed") && (
              <CompletedStatusBanner />
            )}

            {/* 프로세스 타임라인 */}
            <ProcessTimeline
              currentNode={currentNode}
              completedSteps={completedSteps}
              onNodeChange={handleNodeChange}
            />

            {/* 현재 노드 내용 */}
            {renderCurrentNode()}
          </div>
        </div>
      )}
    </>
  );
}
