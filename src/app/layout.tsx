import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../recoil/authAtom";
import { useEffect } from "react";
import Header from "../components/common/Header";
import { Button } from "@ph-mold/ph-ui";
import { postLogout } from "../lib/api/auth";
import { clearToken } from "../lib/electron/authPref";

export default function RootLayout() {
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
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header
        title="홈"
        components={
          <div className="w-fit ml-auto">
            {user ? (
              <div className="flex items-center gap-2 text-sm">
                <span>
                  {user.name} ({user.role})님
                </span>
                <Button size="small" variant="text" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="small" variant="text">
                  로그인
                </Button>
              </Link>
            )}
          </div>
        }
      />
      <main className="mt-16 flex-1 overflow-hidden">
        <Outlet />
      </main>
      <div id="modal-root" />
    </div>
  );
}
