import { Languages } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="bg-neutral-100 border-r-1 font-primary font-bold border-neutral-200 shadow min-w-44 flex flex-col h-screen">
      <div className="m-2 flex flex-col gap-2">
        <NavLink to="/" className="my-2  ">
          AI Feast
        </NavLink>
        <NavLink
          to="/translate"
          className={({ isActive }) =>
            `group rounded-md px-2 flex gap-2 items-center ${
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
              <p>AI Translate</p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/summary"
          className={({ isActive }) =>
            `group rounded-md px-2 flex gap-2 items-center ${
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
                    ? "text-emerald-400" // active state color
                    : "group-hover:text-emerald-400" // hover state color
                }`}
              />
              <p>AI Summarize</p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/question"
          className={({ isActive }) =>
            `group rounded-md px-2 flex gap-2 items-center ${
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
              <p> AI question</p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default SideBar;
