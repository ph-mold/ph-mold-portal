import { useHeader } from "../../../../hooks/useHeader";

export default function LS3510Page() {
  useHeader({
    title: "LS-3510 라벨 생성",
    prevLink: "/erp",
  });

  // 10개의 라벨 데이터 생성
  const labels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `라벨 ${i + 1}`,
  }));

  // 좌우로 5개씩 분리
  const leftLabels = labels.slice(0, 5);
  const rightLabels = labels.slice(5);

  return (
    <div className="h-full p-6 flex items-center justify-center">
      <div className="flex gap-10 h-[90%] max-w-[90%]">
        {/* 왼쪽 5개 라벨 */}
        <div className="flex-1">
          <div className="h-full grid grid-rows-5 gap-4">
            {leftLabels.map((label) => (
              <div
                key={label.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-colors h-full"
              >
                <div className="h-full aspect-[9/5]">
                  <div className="p-4 h-full flex flex-col">
                    <div className="text-sm font-medium">{label.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 5개 라벨 */}
        <div className="flex-1">
          <div className="h-full grid grid-rows-5 gap-4">
            {rightLabels.map((label) => (
              <div
                key={label.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-colors h-full"
              >
                <div className="h-full aspect-[9/5]">
                  <div className="p-4 h-full flex flex-col">
                    <div className="text-sm font-medium">{label.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
