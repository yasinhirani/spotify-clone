import { Link } from "react-router-dom"
import { FileRoutes } from "../utilities/constants/core.constants"
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline"

function BottomNavigation() {
  return (
    <div className="flex md:hidden w-full h-14 bg-black text-white px-10 py-3 items-center">
      <ul className="w-full flex justify-between items-center space-x-5">
        <li>
          <Link to={FileRoutes.HOME}>
            <HomeIcon className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link to={FileRoutes.SEARCH}>
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link to={FileRoutes.HOME}>
            <UserIcon className="w-6 h-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavigation