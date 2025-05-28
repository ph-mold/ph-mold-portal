import { useHeader } from "../../hooks/useHeader";
import PortalToggle from "../../components/domain/PortalToggle";
import { Link } from "react-router-dom";
import { Button } from "@ph-mold/ph-ui";
import { MailQuestion } from "lucide-react";

export default function ErpPage() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return (
    <div className="mx-4 sm:mx-auto my-4">
      <Link to="/erp/sample-request">
        <Button variant="text" startIcon={<MailQuestion />}>
          고객 샘플 요청
        </Button>
      </Link>
    </div>
  );
}
