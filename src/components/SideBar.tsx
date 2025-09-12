import { Languages } from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="bg-neutral-100 border-r-1 font-primary font-bold border-neutral-200 shadow min-w-44 flex flex-col h-screen">
      <div className="m-2 flex flex-col gap-2">
        <Link to="/" className="my-2  ">
          AI Feast
        </Link>
        <Link
          to="/translate"
          className="group hover:bg-neutral-600 rounded-md px-2 hover:text-neutral-50 flex gap-2 items-center"
        >
          <Languages size={18} className="group-hover:text-blue-700" />
          <p>AI Translate</p>
        </Link>
        <Link
          to="/summary"
          className="hover:bg-neutral-600 rounded-md px-2  hover:text-neutral-50"
        >
          AI Summarize
        </Link>
        <Link
          to="/question"
          className="hover:bg-neutral-600 rounded-md px-2  hover:text-neutral-50"
        >
          AI question
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
