import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { Button } from "@ph-mold/ph-ui";
import { clearToken } from "../lib/electron/authPref";
import { postLogout } from "../lib/api/auth";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../recoil/auth/authAtom";

export default function Home() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);

  const handleLogout = async () => {
    await postLogout();
    await clearToken();
    resetUser();
    navigate("/login");
  };

  return (
    <>
      <Header
        title="홈"
        components={
          user ? (
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
          )
        }
      />
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
