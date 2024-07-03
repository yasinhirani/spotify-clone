/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../features/userPlaylist/userPlaylist";
import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import { PlusIcon } from "@heroicons/react/24/outline";

function MyPlaylist() {
  const navigate = useNavigate();

  const userPlaylistState = useSelector((state: any) => state.UserPlaylists);

  const dispatch = useDispatch();
  return (
    <div className="flex-grow">
      <div className="mt-10 md:mt-28 px-4 pb-8">
        <h4 className="text-white font-semibold text-2xl">Your Playlists</h4>
        <button
          className="flex items-center space-x-4 text-gray-300 hover:text-white group mt-6"
          onClick={() => dispatch(setModalOpen(true))}
        >
          <div className="bg-gray-300 group-hover:bg-white p-1 rounded">
            <PlusIcon className="w-6 h-6 text-black" />
          </div>
          <span className="font-semibold">Create Playlist</span>
        </button>
        {userPlaylistState.userPlaylists &&
          userPlaylistState.userPlaylists.length > 0 && (
            <div className="flex flex-col mt-8">
              {userPlaylistState.userPlaylists.map((playlist: any) => {
                return (
                  <button
                    key={playlist.id}
                    type="button"
                    className="w-full flex items-center space-x-3 rounded-md"
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
                    <p className="text-white text-lg">{playlist.name}</p>
                  </button>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

export default MyPlaylist;
