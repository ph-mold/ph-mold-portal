import { LabelData } from "../../lib/types/label-sticker";
import { LABEL_TYPE_CONFIGS } from "./constants";

interface LabelGridProps {
  data: Partial<LabelData>[];
  labelType: "ls-3509" | "ls-3510";
  onCardClick: (index: number) => void;
  LabelCardComponent: React.ComponentType<{
    data: Partial<LabelData>;
    onClick: () => void;
  }>;
}

export function LabelGrid({
  data,
  labelType,
  onCardClick,
  LabelCardComponent,
}: LabelGridProps) {
  const config = LABEL_TYPE_CONFIGS[labelType];
  const rowsPerColumn = Math.ceil(config.labelCount / 2);

  return (
    <div className="h-full flex shrink-0">
      <div className="flex gap-6 h-full">
        {/* 왼쪽 라벨들 */}
        <div className="h-full">
          <div className={`grid grid-rows-${rowsPerColumn} gap-4 h-full`}>
            {data.map(
              (item, index) =>
                index % 2 === 0 && (
                  <LabelCardComponent
                    key={index}
                    data={item}
                    onClick={() => onCardClick(index)}
                  />
                )
            )}
          </div>
        </div>

        {/* 오른쪽 라벨들 */}
        <div className="h-full">
          <div className={`grid grid-rows-${rowsPerColumn} gap-4 h-full`}>
            {data.map(
              (item, index) =>
                index % 2 === 1 && (
                  <LabelCardComponent
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
