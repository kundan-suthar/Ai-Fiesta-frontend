import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div className="flex bg-bg font-primary ">
      <SideBar />
      <main className=" w-[100%] ml-14 sm:ml-44 ">
        {/* Render child routes */}
        <Outlet />
      </main>
    </div>
  );
}
