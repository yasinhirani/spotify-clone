/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { FileRoutes } from "../utilities/constants/core.constants";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import PlaylistIcon from "../../shared/components/PlaylistIcon";

interface IProps {
  setLogoutConfirmationOpen: (open: boolean) => void;
}

function BottomNavigation({ setLogoutConfirmationOpen }: IProps) {
  const authState = useSelector((state: any) => state.Auth);

  return (
    <div className="flex md:hidden w-full h-14 bg-black text-white px-10 py-3 items-center rounded-lg">
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
          <Link to={FileRoutes.MY_PLAYLIST}>
            <PlaylistIcon className="w-6 h-6" />
          </Link>
        </li>
        <li>
          {authState.authData ? (
            <button onClick={() => setLogoutConfirmationOpen(true)}>
              <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
            </button>
          ) : (
            <Link to={FileRoutes.LOGIN}>
              <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default BottomNavigation;
