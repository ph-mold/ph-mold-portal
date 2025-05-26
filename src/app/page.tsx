import { useHeader } from "../hooks/useHeader";
import PortalToggle from "../components/domain/PortalToggle";

export default function Home() {
  useHeader({
    leftSlot: <PortalToggle />,
  });
  return <>홈</>;
}
