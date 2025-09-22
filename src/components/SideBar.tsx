import { BookOpenText, FileText, Languages, Waypoints } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="bg-neutral-100 border-r-1 font-primary font-bold border-neutral-200 shadow w-14  sm:min-w-44 flex flex-col min-h-full fixed ">
      <div className="m-2 flex flex-col gap-2">
        <NavLink
          to="/"
          className="group rounded-md px-2 mb-3 flex gap-2 items-center ${isActive}"
        >
          <>
            <Waypoints size={18} />
            <p className="sm:block hidden">AI Fiesta</p>
          </>
        </NavLink>
        <NavLink
          to="/translate"
          className={({ isActive }) =>
            `group rounded-md p-2  flex gap-2 items-center ${
              isActive
                ? "bg-neutral-600 text-neutral-50"
                : "hover:bg-neutral-600 hover:text-neutral-50"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Languages
                size={18}
                className={`${
                  isActive
                    ? "text-blue-400" // active state color
                    : "group-hover:text-blue-400" // hover state color
                }`}
              />
              <p className="sm:block hidden">AI Translate</p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/summary"
          className={({ isActive }) =>
            `group rounded-md p-2 flex gap-2 items-center ${
              isActive
                ? "bg-neutral-600 text-neutral-50"
                : "hover:bg-neutral-600 hover:text-neutral-50"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FileText
                size={18}
                className={`${
                  isActive
                    ? "text-emerald-400" // active state color
                    : "group-hover:text-emerald-400" // hover state color
                }`}
              />
              <p className="sm:block hidden">AI Summarize</p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/question"
          className={({ isActive }) =>
            `group rounded-md p-2 flex gap-2 items-center ${
              isActive
                ? "bg-neutral-600 text-neutral-50"
                : "hover:bg-neutral-600 hover:text-neutral-50"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <BookOpenText
                size={18}
                className={`${
                  isActive
                    ? "text-fuchsia-400" // active state color
                    : "group-hover:text-fuchsia-400" // hover state color
                }`}
              />
              <p className="sm:block hidden"> AI question</p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default SideBar;
