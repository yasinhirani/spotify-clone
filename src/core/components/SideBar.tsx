/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileRoutes } from "../utilities/constants/core.constants";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../features/userPlaylist/userPlaylist";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userPlaylistsState = useSelector((state: any) => state.UserPlaylists);
  const { authData } = useSelector((state: any) => state.Auth);

  const isActive = (path: string) => path === location.pathname;

  const handleCreatePlaylistClick = () => {
    if (authData) {
      dispatch(setModalOpen(true));
    } else {
      navigate(FileRoutes.LOGIN);
    }
  };

  return (
    <aside className="w-[250px] min-w-[250px] lg:w-[350px] lg:min-w-[350px] bg-black px-5 py-6 hidden md:flex flex-col">
      <div className="flex-grow">
        <h1 className="text-white font-bold text-3xl">TuneTide</h1>
        <ul className="mt-10 space-y-6">
          <li
            className={`${
              isActive(FileRoutes.HOME)
                ? "text-white"
                : "text-[#b3b3b3] hover:text-white"
            } transition-colors`}
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
                : "text-[#b3b3b3] hover:text-white"
            } transition-colors`}
          >
            <Link
              to={FileRoutes.SEARCH}
              className="flex items-center space-x-4"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
              <span className="font-semibold">Search</span>
            </Link>
          </li>
        </ul>
        <div className="mt-10">
          <button
            className="flex items-center space-x-4 text-gray-300 hover:text-white group"
            onClick={handleCreatePlaylistClick}
          >
            <div className="bg-gray-300 group-hover:bg-white p-1 rounded">
              <PlusIcon className="w-6 h-6 text-black" />
            </div>
            <span className="font-semibold">Create Playlist</span>
          </button>
          <div className="flex flex-col space-y-8 mt-8">
            {userPlaylistsState.userPlaylists &&
              userPlaylistsState.userPlaylists.map((playlist: any) => {
                return (
                  <button
                    key={playlist.id}
                    type="button"
                    className="flex items-center space-x-3"
                    onClick={() =>
                      navigate(`${FileRoutes.PLAYLIST}/${playlist.id}`)
                    }
                  >
                    <div className="w-9 h-9 rounded-md flex justify-center items-center font-semibold bg-gray-400">
                      {playlist.name
                        .split(" ")
                        .map((name: string) => name.charAt(0))
                        .join("")}
                    </div>
                    <p className="text-white text-sm">{playlist.name}</p>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      {/* <footer>
        <button className="flex items-center space-x-2 border border-gray-400 rounded-3xl px-4 py-2 text-white">
          <GlobeAltIcon className="w-6 h-6" />
          <span className="font-semibold">English</span>
        </button>
      </footer> */}
    </aside>
  );
}

export default SideBar;
