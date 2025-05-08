import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <div id="modal-root" />
    </>
  );
}
