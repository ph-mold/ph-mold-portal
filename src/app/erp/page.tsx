import { useHeader } from "../../hooks/useHeader";
import PortalToggle from "../../components/domain/PortalToggle";

export default function ErpPage() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return <>erp</>;
}
