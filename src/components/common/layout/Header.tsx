import { Button } from "@ph-mold/ph-ui";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerState } from "../../../recoil/headerAtom";
import { useUser } from "../../../hooks/useUser";

export default function Header() {
  const header = useRecoilValue(headerState);
  const { user } = useUser();

  return (
    <header className="border-border-light fixed top-0 z-10 h-16 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <div className="flex gap-2 items-center px-4 py-3 h-full">
        {header.prevLink && (
          <Link to={header.prevLink}>
            <Button className="!p-1" variant="text">
              <ChevronLeft />
            </Button>
          </Link>
        )}
        <h1 className="text-lg">{header.title}</h1>
        {header.leftSlot}
        <div className="w-fit ml-auto h-full flex items-center gap-0.5 text-sm">
          {header.rightSlot}
          {user ? (
            <Link to={"/user"}>
              <Button size="small" variant="text" color="secondary">
                {user.name}
                <span className="text-foreground2">님</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="small" variant="text">
                로그인
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
