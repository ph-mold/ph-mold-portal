import { Skeleton } from "@ph-mold/ph-ui";

export function ProductImageGallerySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square">
        <Skeleton className="size-full" />
      </div>

      <div className="relative grid grid-cols-5 gap-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="aspect-square w-full" />
        ))}
      </div>
    </div>
  );
}
