import {
    GlobeAltIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { FileRoutes } from "../utilities/constants/core.constants";

function SideBar() {
  const location = useLocation();

  const isActive = (path: string) => path === location.pathname;
  return (
    <aside className="w-[250px] min-w-[350px] bg-black px-5 py-6 hidden md:flex flex-col justify-between">
      <div>
        <figure>
          <img src="/images/spotify_white.svg" alt="spotify" />
        </figure>
        <ul className="mt-10 space-y-6">
          <li
            className={`${
              isActive(FileRoutes.HOME)
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Link to={FileRoutes.HOME} className="flex items-center space-x-4">
              <HomeIcon className="w-6 h-6" />
              <span className="font-semibold">Home</span>
            </Link>
          </li>
          <li
            className={`${
              isActive(FileRoutes.SEARCH)
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Link to={FileRoutes.SEARCH} className="flex items-center space-x-4">
              <MagnifyingGlassIcon className="w-6 h-6" />
              <span className="font-semibold">Search</span>
            </Link>
          </li>
        </ul>
        <div className="mt-10">
          <button className="flex items-center space-x-4 text-gray-300 hover:text-white group">
            <div className="bg-gray-300 group-hover:bg-white p-1 rounded">
              <PlusIcon className="w-6 h-6 text-black" />
            </div>
            <span className="font-semibold">Create Playlist</span>
          </button>
        </div>
      </div>
      <footer>
        <button className="flex items-center space-x-2 border border-gray-400 rounded-3xl px-4 py-2 text-white">
            <GlobeAltIcon className="w-6 h-6" />
            <span className="font-semibold">English</span>
        </button>
      </footer>
    </aside>
  );
}

export default SideBar;
