import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/authAtom";
import { Button, Input, useAlert } from "@ph-mold/ph-ui";
import { postLogout } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";
import { clearToken, getRefreshToken } from "../../lib/electron/authPref";
import { isElectron } from "../../lib/electron/isElectron";
import { useHeader } from "../../hooks/useHeader";

export default function UserPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const alert = useAlert();
  useHeader({
    title: "정보",
    prevLink: "/",
  });

  const handleLogout = () => {
    alert({
      description: "로그아웃 하시겠습니까?",
      acceptLabel: "로그아웃",
      cancelLabel: "취소",
      onAccept: async () => {
        const refreshToken = await getRefreshToken();
        await postLogout(
          isElectron ? { refresh_token: refreshToken } : undefined
        );
        await clearToken();
        resetUser();
        navigate("/login");
      },
    });
  };

  return (
    <>
      {user && (
        <div className="border-background2 bg-background my-4 w-full rounded-xl p-4 sm:mx-auto sm:border-2 space-y-3 sm:!w-100">
          <Input label="이름" readOnly value={user?.name} />
          <Input label="이메일" readOnly value={user?.email} />
          <Input label="권한" readOnly value={user?.role} />
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={handleLogout}
            fullWidth
          >
            로그아웃
          </Button>
        </div>
      )}
    </>
  );
}
