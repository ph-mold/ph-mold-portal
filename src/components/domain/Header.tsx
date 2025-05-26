import { Button } from "@ph-mold/ph-ui";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { headerState } from "../../recoil/headerAtom";
import { useUser } from "../../hooks/useUser";
import { userState } from "../../recoil/authAtom";
import { postLogout } from "../../lib/api/auth";
import { clearToken, getRefreshToken } from "../../lib/electron/authPref";
import { useEffect } from "react";

export default function Header() {
  const header = useRecoilValue(headerState);
  const { user } = useUser();
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);

  const handleLogout = async () => {
    await postLogout();
    await clearToken();
    resetUser();
    navigate("/login");
  };

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
        <div className="w-fit ml-auto h-full flex items-center gap-2 text-sm">
          {header.rightSlot}
          {user ? (
            <>
              <span>
                {user.name} ({user.role})님
              </span>
              <Button size="small" variant="text" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
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
