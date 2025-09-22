import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div className="flex bg-slate-50 ">
      <SideBar />
      <main className="p-4 w-[100%] ml-14 sm:ml-44">
        {/* Render child routes */}
        <Outlet />
      </main>
    </div>
  );
}
