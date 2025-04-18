/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddSongToUserPlaylistMutation } from "../../pages/playlistDetail/utilities/service/playlistDetail.service";
import { setModalOpen } from "../../features/userPlaylist/userPlaylist";

interface IProps {
  setAddSongModalOpen: (open: boolean) => void;
  selectedSong: any;
}

function AddSongToPlaylist({ setAddSongModalOpen, selectedSong }: IProps) {
  const { userPlaylists } = useSelector((state: any) => state.UserPlaylists);

  const dispatch = useDispatch();

  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);

  const [addSongToUserPlaylist, { data: addSongRes, isLoading }] =
    useAddSongToUserPlaylistMutation();

  const handleSubmit = async () => {
    await addSongToUserPlaylist({
      id: selectedPlaylist,
      data: selectedSong,
    }).then(() => {
      setAddSongModalOpen(false);
    });
  };

  useEffect(() => {
    if (addSongRes) {
      if (addSongRes.success) {
        toast.success(addSongRes.message);
      }
      setAddSongModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSongRes]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-5">
      <div className="main-bg w-96 h-auto p-5 rounded-md animate-scale">
        <h4 className="text-white font-semibold text-2xl mb-5">
          Select the playlist
        </h4>
        {userPlaylists.length > 0 ? (
          <div className="space-y-4">
            {userPlaylists.map((playlist: any) => {
              return (
                <button
                  key={playlist.id}
                  type="button"
                  className={`w-full flex items-center space-x-3 p-2 rounded-md ${
                    selectedPlaylist === playlist.id
                      ? "bg-white bg-opacity-10"
                      : ""
                  }`}
                  onClick={() => setSelectedPlaylist(playlist.id)}
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
            <button
              className="underline text-white"
              onClick={() => {
                setAddSongModalOpen(false);
                dispatch(setModalOpen(true));
              }}
            >
              Create New Playlist
            </button>
          </div>
        ) : (
          <h6 className="text-white font-semibold text-lg">
            No playlist found,{" "}
            <button
              className="underline"
              onClick={() => {
                setAddSongModalOpen(false);
                dispatch(setModalOpen(true));
              }}
            >
              Create One
            </button>
          </h6>
        )}
        <div className="flex items-center space-x-5 mt-5">
          <button
            type="reset"
            className="w-full font-medium border border-white text-white rounded-xl p-2 disabled:opacity-60"
            onClick={() => setAddSongModalOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full font-medium border border-white bg-white rounded-xl p-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!selectedPlaylist || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Adding" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSongToPlaylist;
