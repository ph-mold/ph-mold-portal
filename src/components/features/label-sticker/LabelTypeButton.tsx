import { Button } from "@ph-mold/ph-ui";
import { ReactNode } from "react";

interface Props {
  labelType: string;
  onClick: (labelType: string) => void;
  children: ReactNode;
  color: "blue" | "green";
}

export function LabelTypeButton({
  labelType,
  onClick,
  children,
  color,
}: Props) {
  const colorClasses = {
    blue: "border-blue-300 hover:!border-blue-500 from-blue-50 to-indigo-50",
    green:
      "border-green-300 hover:!border-green-500 from-green-50 to-emerald-50",
  };

  return (
    <Button
      variant="outlined"
      size="large"
      onClick={() => onClick(labelType)}
      className={`group relative flex flex-col items-center gap-4 px-8 py-8 min-w-[160px] hover:shadow-lg transition-all duration-200 border-2 !${colorClasses[color]}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg`}
      />
      <div className="relative z-10">{children}</div>
    </Button>
  );
}
