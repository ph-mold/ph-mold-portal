import { LabelData3510 } from "../../../../lib/types/label-sticker";
import { clsx } from "clsx";

interface LabelCardProps {
  data: Partial<LabelData3510>;
  onClick: () => void;
}

export function LabelCard({ data, onClick }: LabelCardProps) {
  const hasData = "value1" in data;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-lg border-2 cursor-pointer transition-colors h-full relative overflow-hidden group",
        hasData
          ? "bg-[var(--card-bg)] border-[var(--card-bg)]"
          : "bg-background border-border-strong hover:border-signature"
      )}
      style={
        hasData
          ? ({ "--card-bg": data.backgroundColor } as React.CSSProperties)
          : undefined
      }
    >
      <div className="h-full aspect-[7/4] flex p-2">
        {!hasData ? (
          <span className="text-foreground2 text-sm m-auto group-hover:!text-signature">
            클릭
          </span>
        ) : (
          <div className="w-full space-y-1">
            <div className="flex items-center gap-1">
              {data.value1 && (
                <div className="font-medium text-base truncate">
                  {data.value1}
                </div>
              )}
              {data.value2 && (
                <>
                  <div className="text-xs">|</div>
                  <div className="text-xs">{data.value2}</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              {data.value3 && <div>코드: {data.value3}</div>}
              {data.value4 && <div>수량: {data.value4}</div>}
              {data.value5 && <div>중량: {data.value5}</div>}
              {data.value6 && <div>납품일: {data.value6}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
