import { LabelData } from "../../../lib/types/label-sticker";
import { LabelCard } from "./LabelCard";

interface LabelGridProps {
  data: Partial<LabelData>[];
  onCardClick: (index: number) => void;
}

export function LabelGrid({ data, onCardClick }: LabelGridProps) {
  return (
    <div className="h-full flex shrink-0">
      <div className="flex gap-6 h-full">
        {/* 왼쪽 5개 라벨 */}
        <div className="h-full">
          <div className="grid grid-rows-5 gap-4 h-full">
            {data.map(
              (item, index) =>
                index % 2 === 0 && (
                  <LabelCard
                    key={index}
                    data={item}
                    onClick={() => onCardClick(index)}
                  />
                )
            )}
          </div>
        </div>

        {/* 오른쪽 5개 라벨 */}
        <div className="h-full">
          <div className="grid grid-rows-5 gap-4 h-full">
            {data.map(
              (item, index) =>
                index % 2 === 1 && (
                  <LabelCard
                    key={index}
                    data={item}
                    onClick={() => onCardClick(index)}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
