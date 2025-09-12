import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div className="flex ">
      <SideBar />
      <main className="p-4">
        {/* Render child routes */}
        <Outlet />
      </main>
    </div>
  );
}
