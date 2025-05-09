import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <div id="modal-root" />
    </>
  );
}
