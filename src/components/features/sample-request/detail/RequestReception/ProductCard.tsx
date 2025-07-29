import { Button } from "@ph-mold/ph-ui";
import { formatCount } from "@/utils/format";
import { ISampleRequest } from "@/lib/types/sample-request";
import { IMAGE_BASE_URL } from "@/lib/constants/api";
import { ExternalLink } from "lucide-react";
import { isElectron } from "@/lib/electron/isElectron";

interface Props {
  req: ISampleRequest;
}

export function ProductCard({ req }: Props) {
  const prod = req.product;

  const handleProductClick = async () => {
    const url = `http://phmold.co.kr/product/${prod.key}`;

    if (isElectron && window.electronAPI) {
      // Electron 환경에서는 electronAPI를 사용하여 외부 브라우저로 열기
      try {
        await window.electronAPI.openExternal(url);
      } catch (error) {
        console.error("Failed to open external URL:", error);
        // 실패 시 웹 방식으로 fallback
        window.open(url, "_blank");
      }
    } else {
      // 웹 환경에서는 새 탭으로 열기
      window.open(url, "_blank");
    }
  };

  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-border-strong">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">제품 정보</h2>
        <Button
          variant="outlined"
          size="small"
          onClick={handleProductClick}
          className="flex items-center gap-1.5"
          startIcon={<ExternalLink size={14} />}
        >
          제품 바로가기
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* 썸네일 */}
        <div className="flex-shrink-0">
          <img
            src={`${IMAGE_BASE_URL}${prod.thumbnailImageUrl}`}
            alt={`thumb-${prod.code}`}
            className="w-full max-w-40 h-40 object-contain rounded-lg border border-border-strong shadow-sm bg-background2"
          />
        </div>

        {/* 제품 정보 */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground2">
                제품 코드
              </span>
              <p className="text-sm text-foreground font-medium">{prod.code}</p>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground2">
                제품명
              </span>
              <p className="text-sm text-foreground font-medium">{prod.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground2">분류</span>
              <p className="text-sm text-foreground">
                {prod.mainCategory}
                {prod.subCategory && (
                  <span className="text-foreground2">
                    {" "}
                    / {prod.subCategory}
                  </span>
                )}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground2">재질</span>
              <p className="text-sm text-foreground">{prod.material}</p>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground2">
                최소 주문 수량
              </span>
              <p className="text-sm text-foreground">
                {formatCount(prod.moq ?? 0)} 개
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
