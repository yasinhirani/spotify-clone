/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Loader from "../../shared/components/Loader";
import { useGetAlbumDetailQuery } from "./utilities/service/albumDetail.service";
import { ClockIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { extractColors } from "extract-colors";
import { setMusicList } from "../../features/musicList/musicList";
import { useDispatch, useSelector } from "react-redux";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import AddSongToPlaylist from "../../shared/components/AddSongToPlaylist";

function AlbumDetail() {
  const { albumId } = useParams();
  const { data: albumDataRes } = useGetAlbumDetailQuery(albumId!);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: any) => state.Auth);
  const musicState = useSelector((state: any) => state.MusicList);

  const [albumData, setAlbumData] = useState<any>(null);
  const [albumTracks, setAlbumTracks] = useState<any>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [addSongModalOpen, setAddSongModalOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);

  const handleClick = (index: number) => {
    if (!authState.authData) {
      navigate(FileRoutes.LOGIN);
      return;
    }

    const selectedMusic = albumTracks[index];

    if (
      musicState.currentlyPlaying &&
      musicState.currentlyPlaying.id === selectedMusic.id
    ) {
      return;
    }
    const dispatchObj = {
      currentlyPlaying: {
        id: selectedMusic.id,
        name: selectedMusic.name,
        artist: selectedMusic.artists.map((artist: any) => artist.name),
        duration_ms: selectedMusic.duration_ms,
        preview_url: selectedMusic.preview_url,
        image: albumData.images[0].url,
      },
      musicList: albumTracks.map((track: any) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name),
          duration_ms: track.duration_ms,
          preview_url: track.preview_url,
          image: albumData.images[0].url,
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
      album: albumData,
      preview_url: songDetail.preview_url,
    };
    setSelectedSong(songObj);
    setAddSongModalOpen(true);
  };

  useEffect(() => {
    if (albumDataRes) {
      setAlbumData(albumDataRes.data.album);
      setAlbumTracks(albumDataRes.data.album.tracks.items);
      extractColors(albumDataRes.data.album.images[0].url, {
        crossOrigin: "anonymous",
      }).then((colors) => setExtractedColors(colors.map((color) => color.hex)));
    }
  }, [albumDataRes]);

  useEffect(() => {
    if(extractedColors.length > 0) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({id: 'BG_COLOR', message: extractedColors[1]}))
    }
    return () => {
      window.ReactNativeWebView?.postMessage(JSON.stringify({id: 'RESET_BG_COLOR', message:''}))
    }
  }, [extractedColors]);

  if (!albumData) {
    return <Loader />;
  }
  return (
    <>
      <div
        className="flex-grow space-y-10 flex flex-col"
        style={{
          background: extractedColors[1],
        }}
      >
        {/* Start Artist Details */}
        <div className="pt-10 bg-opacity-40">
          <div className="flex flex-col sm:flex-row items-end sm:space-x-10 px-8 md:mt-20">
            <figure className="w-full h-full sm:w-48 sm:min-w-48 rounded-md overflow-hidden">
              <img
                src={albumData.images[0].url}
                alt={albumData.name}
                className="w-full h-full object-cover aspect-square"
              />
            </figure>
            <div className="text-white mt-5 sm:mt-0">
              <span className="text-base capitalize">{albumData.type}</span>
              <h2 className="font-bold text-4xl">
                {albumData.name}
              </h2>
              <p className="mt-2 text-sm">
                {albumData.artists
                  .map((artist: any) => artist.name)
                  .join(" • ")}
              </p>
            </div>
          </div>
        </div>
        {/* End Artist Details */}
        <div className="black-bg py-10 flex-grow">
          {/* Start play and follow button */}
          <div className="flex items-center space-x-10 mt-5 px-8">
            <button
              className="bg-[#1DB954] w-16 h-16 rounded-full flex justify-center items-center"
              onClick={() => handleClick(0)}
            >
              <PlayIcon className="size-10" />
            </button>
            {/* <button className="text-white">
              <PlusCircleIcon className="w-10 h-10" />
            </button> */}
          </div>
          {/* End play and follow button */}
          {/* Start Popular songs */}
          <div className="mt-5 px-8">
            <div className="flex items-center text-gray-400 relative border-b border-b-gray-500 pb-2 mt-10 p-2">
              <span className="text-gray-400 absolute left-2">#</span>
              <div className="w-full lg:min-w-80 text-left ml-10">Title</div>
              <p className="ml-5 hidden md:block">
                <ClockIcon className="w-6 h-6" />
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {albumTracks.map((track: any, index: number) => {
                return (
                  <div
                    className="flex items-center text-white relative group hover:bg-white hover:bg-opacity-10 p-2 rounded-md transition-colors"
                    key={track.id}
                  >
                    {musicState.currentlyPlaying &&
                    musicState.currentlyPlaying.id === track.id ? (
                      <span className="mini-loader absolute left-2" />
                    ) : (
                      <span className="text-gray-400 absolute left-2">
                        {index + 1}
                      </span>
                    )}

                    <button
                      className="w-full lg:min-w-80 text-left ml-10"
                      onClick={() => handleClick(index)}
                    >
                      <p className="font-semibold line-clamp-2">{track.name}</p>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {track.artists
                          .map((artist: any) => artist.name)
                          .join(", ")}
                      </p>
                    </button>
                    {authState.authData && <button
                      className="lg:invisible lg:group-hover:visible ml-4"
                      onClick={() => addSongToPlaylist(track)}
                    >
                      <PlusCircleIcon className="w-6 h-6 text-white" />
                    </button>}
                    <p className="ml-5 hidden md:block">{`${Math.floor(
                      track.duration_ms / 1000 / 60
                    )}:${
                      Math.floor((track.duration_ms / 1000) % 60) > 9
                        ? Math.floor((track.duration_ms / 1000) % 60)
                        : `0${Math.floor((track.duration_ms / 1000) % 60)}`
                    }`}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* End Popular songs */}
        </div>
      </div>
      {addSongModalOpen && (
        <AddSongToPlaylist
          setAddSongModalOpen={setAddSongModalOpen}
          selectedSong={selectedSong}
        />
      )}
    </>
  );
}

export default AlbumDetail;
