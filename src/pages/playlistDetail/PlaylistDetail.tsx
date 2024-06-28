/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Loader from "../../shared/components/Loader";
import { ClockIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useGetPlaylistDetailQuery } from "./utilities/service/playlistDetail.service";
import { extractColors } from "extract-colors";
import { useDispatch, useSelector } from "react-redux";
import { setMusicList } from "../../features/musicList/musicList";
import { FileRoutes } from "../../core/utilities/constants/core.constants";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const { data: playlistDatRes } = useGetPlaylistDetailQuery(playlistId!);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: any) => state.Auth);
  const musicState = useSelector((state: any) => state.MusicList);

  const [playlistData, setPlaylistData] = useState<any>(null);
  const [playlistTracks, setPlaylistTracks] = useState<any>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const handleClick = (index: number) => {
    if (!authState.authData) {
      navigate(FileRoutes.LOGIN);
      return;
    }
    const selectedMusic = playlistTracks.filter(
      (track: any) =>
        !Object.prototype.hasOwnProperty.call(track.track, "restrictions")
    )[index];
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

  useEffect(() => {
    if (playlistDatRes) {
      setPlaylistData(playlistDatRes);
      setPlaylistTracks(
        playlistDatRes.tracks.items.filter((track: any) => track.track)
      );
      extractColors(playlistDatRes.images[0].url, {
        crossOrigin: "anonymous",
      }).then((colors) => setExtractedColors(colors.map((color) => color.hex)));
    }
  }, [playlistDatRes]);

  if (!playlistData && !playlistTracks) {
    return <Loader />;
  }
  return (
    <div
      className="flex-grow space-y-10"
      style={{
        background: extractedColors[1],
      }}
    >
      {/* Start Artist Details */}
      <div className="pt-10 bg-opacity-40">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-10 px-8 md:mt-20">
          <figure className="w-full h-full sm:w-56 sm:h-56 rounded-md overflow-hidden">
            <img
              src={playlistData.images[0].url}
              alt={playlistData.name}
              className="w-full h-full object-cover aspect-auto"
            />
          </figure>
          <div className="text-white mt-5 sm:mt-0">
            <span className="text-base capitalize">{playlistData.type}</span>
            <h2 className="font-bold text-4xl md:text-8xl">
              {playlistData.name}
            </h2>
            <p className="mt-4 text-sm">{playlistData.description}</p>
          </div>
        </div>
      </div>
      {/* End Artist Details */}
      <div className="black-bg py-10">
        {/* Start play and follow button */}
        <div className="flex items-center space-x-10 mt-5 px-8">
          <button
            className="bg-[#1DB954] w-16 h-16 rounded-full flex justify-center items-center"
            onClick={() => handleClick(0)}
          >
            <PlayIcon className="size-10" />
          </button>
          <button className="text-white">
            <PlusCircleIcon className="w-10 h-10" />
          </button>
        </div>
        {/* End play and follow button */}
        {/* Start Popular songs */}
        <div className="mt-5 px-8">
          <div className="flex items-center text-gray-400 relative border-b border-b-gray-500 pb-2 mt-10">
            <span className="text-gray-400 absolute left-0">#</span>
            <div className="w-full lg:min-w-80 text-left ml-8">Title</div>
            <p className="ml-5">
              <ClockIcon className="w-6 h-6" />
            </p>
          </div>
          <div className="mt-5 space-y-6">
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
                    className="flex items-center text-white relative"
                    key={`${track.track.id}${index}`}
                  >
                    {musicState.currentlyPlaying &&
                    musicState.currentlyPlaying.id === track.id ? (
                      <span className="mini-loader" />
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
                      className="w-full md:min-w-80 text-left ml-8"
                      onClick={() => handleClick(index)}
                    >
                      <p className="font-semibold">{track.track.name}</p>
                      <p className="text-sm text-gray-400">
                        {track.track.artists
                          .map((artist: any) => artist.name)
                          .join(", ")}
                      </p>
                    </button>
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
    </div>
  );
}

export default PlaylistDetail;
