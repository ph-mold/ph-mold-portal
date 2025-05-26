import { Button } from "@ph-mold/ph-ui";
import { ChevronLeft, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerState } from "../../recoil/headerAtom";
import { useUser } from "../../hooks/useUser";
import { userState } from "../../recoil/authAtom";
import { useEffect } from "react";

export default function Header() {
  const header = useRecoilValue(headerState);
  const { user } = useUser();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser(user ?? null);
  }, [user]);
  return (
    <header className="border-background2 fixed top-0 z-10 h-16 w-full border-b-2 bg-white/80 backdrop-blur-md">
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
            <Button
              size="small"
              variant="text"
              color="secondary"
              startIcon={<CircleUserRound />}
            >
              {user.name}
              <span className="text-foreground2">님</span>
            </Button>
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
