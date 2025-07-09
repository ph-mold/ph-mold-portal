import { Link } from "react-router-dom";
import { useHeader } from "../../hooks/useHeader";
import PortalToggle from "../../components/domain/PortalToggle";
import { Button } from "@ph-mold/ph-ui";
import { PackageSearch, PencilRuler, Tag } from "lucide-react";

export default function CmsPage() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return (
    <div className="mx-4 sm:mx-auto my-4">
      <Link to="/cms/products">
        <Button variant="text" startIcon={<PackageSearch />}>
          제품 관리
        </Button>
      </Link>
      <Link to="/cms/tags">
        <Button variant="text" startIcon={<Tag />}>
          태그 관리
        </Button>
      </Link>
      <Link to="/cms/specs">
        <Button variant="text" startIcon={<PencilRuler />}>
          스펙 관리
        </Button>
      </Link>
    </div>
  );
}
