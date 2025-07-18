import { Outlet } from "react-router-dom";
import Header from "@/components/common/layout/Header";
import RequireAuth from "@/components/common/RequireAuth";
import clsx from "clsx";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}

export default function RootLayout() {
  const isRN = getCookie("platform") === "app";

  return (
    <RequireAuth>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {isRN ? null : <Header />}
        <main
          className={clsx(
            "flex-1 overflow-hidden",
            isRN && "mt-0",
            !isRN && "mt-16"
          )}
        >
          <Outlet />
        </main>
        <div id="modal-root" />
      </div>
    </RequireAuth>
  );
}
