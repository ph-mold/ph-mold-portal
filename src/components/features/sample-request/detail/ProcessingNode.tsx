import { ISampleRequest } from "../../../../lib/types/sample-request";

interface ProcessingNodeProps {
  request: ISampleRequest;
}

export function ProcessingNode({ request }: ProcessingNodeProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">준비 중</h3>

        {/* 담당자 정보 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            담당자
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="담당자명을 입력하세요"
          />
        </div>

        {/* 내부 메모 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내부 메모
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="작업 진행 상황을 기록하세요"
          />
        </div>

        {/* 이미지 업로드 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            첨부 이미지
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-gray-500">
              <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
              <p className="text-sm">
                포장 과정, 준비 상황 등을 사진으로 기록할 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* 상태 변경 버튼 */}
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            취소
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            배송 준비 완료
          </button>
        </div>
      </div>
    </div>
  );
}
