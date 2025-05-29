import useSWR from "swr";
import { useHeader } from "../../../hooks/useHeader";
import { ISampleRequest } from "../../../lib/types/sample-request";
import {
  GET_SAMPLE_REQUESTS,
  getSampleRequests,
} from "../../../lib/api/sample-request";
import SampleRequestTable from "../../../components/sample-request/SampleRequestTable";

export default function SampleRequestsPage() {
  const { data: SampleRequests, isLoading } = useSWR<ISampleRequest[]>(
    [GET_SAMPLE_REQUESTS],
    getSampleRequests
  );

  useHeader({
    title: "고객 샘플 요청",
    prevLink: "/erp",
  });

  return (
    <div className="flex flex-col h-full">
      {!isLoading && SampleRequests && (
        <SampleRequestTable
          data={SampleRequests}
          // onDoubleClick={handleDoubleClick}
        />
      )}
    </div>
  );
}
