import { LabelData } from "../../../lib/types/label-sticker";
import { LabelGrid as CommonLabelGrid } from "../LabelGrid";
import { LabelCard } from "./LabelCard";

interface LabelGridProps {
  data: Partial<LabelData>[];
  onCardClick: (index: number) => void;
}

export function LabelGrid({ data, onCardClick }: LabelGridProps) {
  return (
    <CommonLabelGrid
      data={data}
      labelType="ls-3510"
      onCardClick={onCardClick}
      LabelCardComponent={LabelCard}
    />
  );
}
