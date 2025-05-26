import { Button } from "@ph-mold/ph-ui";
import clsx from "clsx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

enum Mode {
  ERP = "erp",
  CMS = "cms",
}
const MODES = Object.values(Mode) as Mode[];

export default function PortalToggle() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const current: Mode = pathname.startsWith("/cms") ? Mode.CMS : Mode.ERP;

  useEffect(() => {
    if (pathname === "/") navigate(`/${Mode.ERP}`, { replace: true });
  }, [pathname, navigate]);

  const handleChange = (mode: Mode) => {
    if (mode !== current) navigate(`/${mode}`);
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      {MODES.map((mode) => (
        <Button
          key={mode}
          variant="text"
          color={mode === current ? "primary" : "secondary"}
          onClick={() => handleChange(mode)}
          className={clsx(
            "!transition-none !duration-none !px-2 ",
            mode === current
              ? "!text-xl font-semibold"
              : "!text-foreground2 !font-thin text-sm hover:bg-background2"
          )}
        >
          {mode.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
