import { useHeader } from "../../hooks/useHeader";
import PortalToggle from "../../components/common/layout/PortalToggle";
import { Link } from "react-router-dom";
import { Button } from "@ph-mold/ph-ui";
import { MailQuestion, Sticker } from "lucide-react";

export default function ErpPage() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return (
    <div className="mx-4 sm:mx-auto my-4">
      <Link to="/erp/sample-requests">
        <Button variant="text" startIcon={<MailQuestion />}>
          고객 샘플 요청
        </Button>
      </Link>
      <Link to="/erp/label-sticker">
        <Button variant="text" startIcon={<Sticker />}>
          라벨 스티커 생성
        </Button>
      </Link>
    </div>
  );
}
