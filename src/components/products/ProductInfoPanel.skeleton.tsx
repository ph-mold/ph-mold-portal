import { Skeleton } from "@ph-mold/ph-ui";

export default function ProductInfoPanelSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Skeleton className="size-20 h-4.5 mb-0.5" />
        <Skeleton className="size-full h-7.5" />
        <div className="flex flex-wrap space-y-1 space-x-1 py-2">
          <Skeleton className="w-16 h-6.5" />
          <Skeleton className="w-16 h-6.5" />
          <Skeleton className="w-16 h-6.5" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2 !pt-3 ">
        {[...Array(4)].map((_, i) => (
          <div className="flex flex-row justify-between" key={i}>
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-16 h-5" />
          </div>
        ))}
      </div>
      <Skeleton className="size-full h-8" />
    </div>
  );
}
