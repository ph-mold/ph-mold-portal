import { useNavigate } from "react-router-dom";
import { useHeader } from "@/hooks/useHeader";
import { Button } from "@ph-mold/ph-ui";
import { LabelHistory, LabelTypeIcon } from "@/components/label-sticker";
import { LABEL_TYPES } from "@/lib/types/label-sticker";

export default function LabelStickerPage() {
  const navigate = useNavigate();

  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  const handleLabelTypeClick = (labelType: string) => {
    navigate(`/erp/label-sticker/${labelType}`);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* 상단 라벨 타입 선택 영역 */}
      <div className="p-8 border-b border-border-light bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              라벨 스티커
            </h1>
            <p className="text-gray-600">원하는 라벨 타입을 선택하세요</p>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleLabelTypeClick(LABEL_TYPES.LS_3510)}
              className="group relative flex flex-col items-center gap-4 px-8 py-8 min-w-[160px] hover:shadow-lg transition-all duration-200 border-2 hover:border-signature"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              <div className="relative z-10">
                <LabelTypeIcon labelType={LABEL_TYPES.LS_3510} />
              </div>
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => handleLabelTypeClick(LABEL_TYPES.LS_3509)}
              className="group relative flex flex-col items-center gap-4 px-8 py-8 min-w-[160px] hover:shadow-lg transition-all duration-200 border-2 hover:border-signature"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              <div className="relative z-10">
                <LabelTypeIcon labelType={LABEL_TYPES.LS_3509} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 이력 영역 */}
      <div className="flex-1 bg-white">
        <LabelHistory />
      </div>
    </div>
  );
}
