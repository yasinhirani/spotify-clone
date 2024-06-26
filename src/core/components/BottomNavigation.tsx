/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { FileRoutes } from "../utilities/constants/core.constants";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../../features/auth/auth";
import toast from "react-hot-toast";

function BottomNavigation() {
  const authState = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthData(null));
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
  };

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
          {authState.authData ? (
            <button onClick={handleLogout}>
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
