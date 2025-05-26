import { Outlet } from "react-router-dom";
import Header from "../components/domain/Header";

export default function RootLayout() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <main className="mt-16 flex-1 overflow-hidden">
        <Outlet />
      </main>
      <div id="modal-root" />
    </div>
  );
}
