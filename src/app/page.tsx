import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { Button } from "@ph-mold/ph-ui";
import { clearToken } from "../lib/electron/authPref";
import { postLogout } from "../lib/api/auth";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await postLogout();
    await clearToken();
    navigate("/login");
  };

  return (
    <>
      <Header
        title="홈"
        components={
          <>
            <Link to="/login">
              <Button size="small" variant="text">
                로그인
              </Button>
            </Link>
            <Button size="small" variant="text" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        }
      />
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
