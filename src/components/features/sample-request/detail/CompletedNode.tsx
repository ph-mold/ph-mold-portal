import { ISampleRequest } from "../../../../lib/types/sample-request";

interface CompletedNodeProps {
  request: ISampleRequest;
}

export function CompletedNode({ request }: CompletedNodeProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">완료</h3>

        {/* 수령 확인 */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              고객이 샘플을 수령했습니다
            </span>
          </label>
        </div>

        {/* 수령일자 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            수령일자
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 후속 메모 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            후속 메모
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="고객 피드백이나 후속 조치 사항을 기록하세요"
          />
        </div>

        {/* 완료 상태 표시 */}
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                샘플 요청이 성공적으로 완료되었습니다
              </p>
            </div>
          </div>
        </div>

        {/* 상태 변경 버튼 */}
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            이전 단계로
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            완료 처리
          </button>
        </div>
      </div>
    </div>
  );
}
