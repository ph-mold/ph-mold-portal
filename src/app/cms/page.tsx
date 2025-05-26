import { Link } from "react-router-dom";
import { useHeader } from "../../hooks/useHeader";
import PortalToggle from "../../components/domain/PortalToggle";

export default function CmsPage() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return (
    <>
      <Link to="/cms/management/products">제품관리 이동</Link>
    </>
  );
}
