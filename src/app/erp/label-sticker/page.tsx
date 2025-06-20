import { useHeader } from "@/hooks/useHeader";
import { LabelHistory } from "@/components/label-sticker";

export default function LabelStickerPage() {
  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  return <LabelHistory />;
}
