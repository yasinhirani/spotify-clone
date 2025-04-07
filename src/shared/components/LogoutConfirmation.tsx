/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch } from "react-redux";
import { setAuthData } from "../../features/auth/auth";
import { setUserPlaylists } from "../../features/userPlaylist/userPlaylist";
import toast from "react-hot-toast";

interface IProps {
  setLogoutConfirmationOpen: (open: boolean) => void;
}

function LogoutConfirmation({ setLogoutConfirmationOpen }: IProps) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setAuthData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUserPlaylists(null));
    toast.success("Logout Successfully");
    setLogoutConfirmationOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-5">
      <div className="main-bg w-96 h-auto p-5 rounded-md animate-scale">
        <h4 className="text-white font-semibold text-2xl mb-5 text-center">
          Are Your sure, you want to logout?
        </h4>
        <div className="flex items-center space-x-5">
          <button
            type="reset"
            className="w-full font-medium border border-white text-white rounded-xl p-2"
            onClick={() => setLogoutConfirmationOpen(false)}
          >
            No
          </button>
          <button
            type="button"
            className="w-full font-medium border border-white bg-white rounded-xl p-2"
            onClick={handleLogout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;
