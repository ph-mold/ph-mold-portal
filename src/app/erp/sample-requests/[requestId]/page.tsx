import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHeader } from "../../../../hooks/useHeader";
import { ISampleRequest } from "../../../../lib/types/sample-request";
import useSWR from "swr";
import {
  GET_SAMPLE_REQUEST,
  getSampleRequest,
} from "../../../../lib/api/sample-request";
import {
  ProcessTimeline,
  ProcessNode,
  RequestReceptionNode,
  ProcessingNode,
  ShippedNode,
  CompletedNode,
} from "@/components/features/sample-request/detail";

export default function SampleRequestDetailPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const [currentNode, setCurrentNode] = useState<ProcessNode>("reception");

  const { data: request } = useSWR<ISampleRequest | undefined>(
    requestId ? [GET_SAMPLE_REQUEST, requestId] : null,
    () => getSampleRequest(requestId)
  );

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
        return <ProcessingNode />;
      case "shipped":
        return <ShippedNode />;
      case "completed":
        return <CompletedNode />;
      default:
        return <RequestReceptionNode request={request} />;
    }
  };

  return (
    <>
      {request && (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50">
          <div className="mx-auto w-full max-w-7xl px-4 py-6">
            {/* 프로세스 타임라인 */}
            <ProcessTimeline
              currentNode={currentNode}
              completedSteps={["reception", "processing"]} // 요청 접수와 준비 중 완료
              onNodeChange={setCurrentNode}
            />

            {/* 현재 노드 내용 */}
            <div className="space-y-3">{renderCurrentNode()}</div>
          </div>
        </div>
      )}
    </>
  );
}
