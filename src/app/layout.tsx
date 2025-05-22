import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/auth/authAtom";
import { useEffect } from "react";

export default function RootLayout() {
  const { user } = useUser();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser(user ?? null);
  }, [user]);

  return (
    <>
      <Outlet />
      <div id="modal-root" />
    </>
  );
}
