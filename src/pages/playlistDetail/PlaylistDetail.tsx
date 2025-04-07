/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Loader from "../../shared/components/Loader";
import {
  ClockIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  useDeleteSongFromUserPlaylistMutation,
  useGetPlaylistDetailQuery,
} from "./utilities/service/playlistDetail.service";
import { extractColors } from "extract-colors";
import { useDispatch, useSelector } from "react-redux";
import { setMusicList } from "../../features/musicList/musicList";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import AddSongToPlaylist from "../../shared/components/AddSongToPlaylist";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const { data: playlistDataRes, isLoading, isFetching } = useGetPlaylistDetailQuery(playlistId!);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: any) => state.Auth);
  const musicState = useSelector((state: any) => state.MusicList);

  const [playlistData, setPlaylistData] = useState<any>(null);
  const [playlistTracks, setPlaylistTracks] = useState<any>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [addSongModalOpen, setAddSongModalOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);

  const [deleteSongFromUserPlaylist] = useDeleteSongFromUserPlaylistMutation();

  const handleClick = (index: number) => {
    if (!authState.authData) {
      navigate(FileRoutes.LOGIN);
      return;
    }

    const selectedMusic = playlistTracks.filter(
      (track: any) =>
        !Object.prototype.hasOwnProperty.call(track.track, "restrictions")
    )[index];

    if (
      musicState.currentlyPlaying &&
      musicState.currentlyPlaying.id === selectedMusic.track.id
    ) {
      return;
    }

    const dispatchObj = {
      currentlyPlaying: {
        id: selectedMusic.track.id,
        name: selectedMusic.track.name,
        artist: selectedMusic.track.artists.map((artist: any) => artist.name),
        duration_ms: selectedMusic.track.duration_ms,
        preview_url: selectedMusic.track.preview_url,
        image: selectedMusic.track.album.images[0]?.url,
      },
      musicList: playlistTracks
        .filter(
          (track: any) =>
            !Object.prototype.hasOwnProperty.call(track.track, "restrictions")
        )
        .map((track: any) => {
          return {
            id: track.track.id,
            name: track.track.name,
            artist: track.track.artists.map((artist: any) => artist.name),
            duration_ms: track.track.duration_ms,
            preview_url: track.track.preview_url,
            image: track.track.album.images[0]?.url,
          };
        }),
    };
    dispatch(setMusicList(dispatchObj));
  };

  const addSongToPlaylist = (songDetail: any) => {
    const songObj = {
      id: songDetail.id,
      name: songDetail.name,
      duration_ms: songDetail.duration_ms,
      artists: songDetail.artists,
      album: songDetail.album,
      preview_url: songDetail.preview_url,
    };
    setSelectedSong(songObj);
    setAddSongModalOpen(true);
  };

  const deleteSong = async (songId: string) => {
    await deleteSongFromUserPlaylist(songId).unwrap();
  };

  useEffect(() => {
    if (playlistDataRes) {
      setPlaylistData(playlistDataRes.data.playlist);
      setPlaylistTracks(playlistDataRes.data.playlist.tracks.items);
      if (
        Object.prototype.hasOwnProperty.call(
          playlistDataRes.data.playlist,
          "images"
        )
      ) {
        extractColors(playlistDataRes.data.playlist.images[0].url, {
          crossOrigin: "anonymous",
        }).then((colors) =>
          setExtractedColors(colors.map((color) => color.hex))
        );
      } else {
        setExtractedColors(["#b2beb5", "#b2beb5"]);
      }
    }
  }, [playlistDataRes]);

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <>
      {playlistData && <div
        className="flex-grow space-y-10 flex flex-col"
        style={{
          background: extractedColors[1],
        }}
      >
        {/* Start Artist Details */}
        <div className="pt-10 bg-opacity-40">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-10 px-8 md:mt-20">
            {playlistData.images ? (
              <figure className="w-full h-full sm:w-48 rounded-md overflow-hidden">
                <img
                  src={playlistData.images[0].url}
                  alt={playlistData.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </figure>
            ) : (
              <div className="w-full sm:w-48 h-48 rounded-md overflow-hidden flex justify-center items-center font-semibold text-4xl bg-gray-400 uppercase">
                {playlistData.name
                  .split(" ")
                  .map((name: string) => name.charAt(0))
                  .join("")}
              </div>
            )}
            <div className="text-white mt-5 sm:mt-0">
              <span className="text-base capitalize">{playlistData.type}</span>
              <h2 className="font-bold text-4xl">
                {playlistData.name}
              </h2>
              <p className="mt-2 text-sm">{playlistData.description}</p>
            </div>
          </div>
        </div>
        {/* End Artist Details */}
        {playlistTracks.length > 0 ? (
          <div className="black-bg py-10 flex-grow">
            {/* Start play and follow button */}
            <div className="flex items-center space-x-10 mt-5 px-8">
              <button
                className="bg-[#1DB954] w-16 h-16 rounded-full flex justify-center items-center"
                onClick={() => handleClick(0)}
              >
                <PlayIcon className="size-10" />
              </button>
              {!Object.prototype.hasOwnProperty.call(
                playlistData,
                "user_id"
              ) && (
                <button className="text-white">
                  <PlusCircleIcon className="w-10 h-10" />
                </button>
              )}
            </div>
            {/* End play and follow button */}
            {/* Start Popular songs */}
            <div className="mt-5 px-8">
              <div className="flex items-center text-gray-400 relative border-b border-b-gray-500 pb-2 mt-10">
                <span className="text-gray-400 absolute left-0">#</span>
                <div className="w-full lg:min-w-80 text-left ml-8">Title</div>
                <p className="ml-5 hidden md:block">
                  <ClockIcon className="w-6 h-6" />
                </p>
              </div>
              <div className="mt-5 space-y-4">
                {playlistTracks
                  .filter(
                    (track: any) =>
                      !Object.prototype.hasOwnProperty.call(
                        track.track,
                        "restrictions"
                      )
                  )
                  .map((track: any, index: number) => {
                    return (
                      <div
                        className="flex items-center text-white relative group hover:bg-white hover:bg-opacity-10 p-2 rounded-md transition-colors"
                        key={`${track.track.id}${index}`}
                      >
                        {musicState.currentlyPlaying &&
                        musicState.currentlyPlaying.id === track.track.id ? (
                          <span className="mini-loader absolute left-2" />
                        ) : (
                          <span className="text-gray-400 absolute left-2">
                            {index + 1}
                          </span>
                        )}
                        <figure className="w-10 h-10 min-w-10 rounded-md overflow-hidden ml-10">
                          <img
                            src={track.track.album.images[0]?.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </figure>
                        <button
                          className="w-full lg:min-w-80 text-left ml-8"
                          onClick={() => handleClick(index)}
                        >
                          <p className="font-semibold line-clamp-2">
                            {track.track.name}
                          </p>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {track.track.artists
                              .map((artist: any) => artist.name)
                              .join(", ")}
                          </p>
                        </button>
                        {!Object.prototype.hasOwnProperty.call(
                          playlistData,
                          "user_id"
                        ) && (
                          <button
                            className="lg:invisible lg:group-hover:visible ml-4"
                            onClick={() => addSongToPlaylist(track.track)}
                          >
                            <PlusCircleIcon className="w-6 h-6 text-white" />
                          </button>
                        )}
                        {Object.prototype.hasOwnProperty.call(
                          playlistData,
                          "user_id"
                        ) && (
                          <button
                            className="lg:invisible lg:group-hover:visible ml-4"
                            onClick={() => deleteSong(track.track.id)}
                          >
                            <TrashIcon className="w-5 h-5 text-white" />
                          </button>
                        )}
                        <p className="ml-5 hidden md:block">{`${Math.floor(
                          track.track.duration_ms / 1000 / 60
                        )}:${
                          Math.floor((track.track.duration_ms / 1000) % 60) > 9
                            ? Math.floor((track.track.duration_ms / 1000) % 60)
                            : `0${Math.floor(
                                (track.track.duration_ms / 1000) % 60
                              )}`
                        }`}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* End Popular songs */}
          </div>
        ) : (
          <h5 className="text-white text-3xl px-8">
            No songs added to this playlist yet...
          </h5>
        )}
      </div>}
      {addSongModalOpen && (
        <AddSongToPlaylist
          setAddSongModalOpen={setAddSongModalOpen}
          selectedSong={selectedSong}
        />
      )}
    </>
  );
}

export default PlaylistDetail;
