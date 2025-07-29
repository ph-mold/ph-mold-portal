import { ISampleRequest } from "../../../../lib/types/sample-request";

interface ShippedNodeProps {
  request: ISampleRequest;
}

export function ShippedNode({ request }: ShippedNodeProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">배송 중</h3>

        {/* 택배사 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            택배사
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">택배사를 선택하세요</option>
            <option value="cj">CJ대한통운</option>
            <option value="hanjin">한진택배</option>
            <option value="lotte">롯데택배</option>
            <option value="logen">로젠택배</option>
            <option value="daesin">대신택배</option>
            <option value="epost">우체국택배</option>
          </select>
        </div>

        {/* 송장번호 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            송장번호
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="송장번호를 입력하세요"
          />
        </div>

        {/* 배송일자 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송일자
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 배송 추적 링크 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송 추적 링크
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600">
              송장번호 입력 후 자동으로 생성됩니다
            </p>
          </div>
        </div>

        {/* 상태 변경 버튼 */}
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            이전 단계로
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            배송 완료
          </button>
        </div>
      </div>
    </div>
  );
}
