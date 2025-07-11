import { LabelType } from "@/lib/types/label-sticker";

interface LabelTypeIconProps {
  labelType: LabelType;
  className?: string;
}

export function LabelTypeIcon({
  labelType,
  className = "",
}: LabelTypeIconProps) {
  // 라벨 타입별 레이아웃에 맞춰 아이콘 생성
  const getLabelDimensions = () => {
    if (labelType === "ls-3510") {
      return { width: 5, height: 2 }; // 5×2 레이아웃
    } else {
      return { width: 9, height: 2 }; // 9×2 레이아웃
    }
  };

  // 라벨 타입별 색상 설정
  const getBorderColor = () => {
    if (labelType === "ls-3510") {
      return "border-blue-500";
    } else {
      return "border-green-500";
    }
  };

  const { width, height } = getLabelDimensions();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">
        {labelType.toUpperCase()}
      </span>
      <div
        className={`border-2 rounded-sm bg-transparent ${getBorderColor()} relative flex items-center justify-center`}
        style={{
          width: `${width * 16}px`,
          height: `${height * 16}px`,
        }}
      >
        <span className="text-xs font-medium text-gray-600">
          {width}×{height}
        </span>
      </div>
    </div>
  );
}
