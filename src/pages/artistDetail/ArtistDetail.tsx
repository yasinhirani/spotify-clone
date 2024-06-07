/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetArtistDetailQuery,
  useGetArtistPopularTracksQuery,
} from "./utilities/service/artistDetail.service";
import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Loader from "../../shared/components/Loader";
import { setMusicList } from "../../features/musicList/musicList";
import { useDispatch } from "react-redux";

function ArtistDetail() {
  const { artistId } = useParams();
  const dispatch = useDispatch();

  const { data: artistDataRes } = useGetArtistDetailQuery(artistId!);
  const { data: artistPopularTrackRes } = useGetArtistPopularTracksQuery(
    artistId!
  );

  const [artistData, setArtistData] = useState<any>(null);
  const [artistPopularTracks, setArtistPopularTracks] = useState<any>(null);
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const handleClick = (index: number) => {
    const selectedMusic = artistPopularTracks[index];
    const dispatchObj = {
      currentlyPlaying: {
        id: selectedMusic.id,
        name: selectedMusic.name,
        artist: selectedMusic.artists.map((artist: any) => artist.name),
        duration_ms: selectedMusic.duration_ms,
        preview_url: selectedMusic.preview_url,
        image: selectedMusic.album.images[0].url
      },
      musicList: artistPopularTracks.map((track: any) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name),
          duration_ms: track.duration_ms,
          preview_url: track.preview_url,
          image: track.album.images[0].url,
        };
      }),
    };
    dispatch(setMusicList(dispatchObj));
  };

  useEffect(() => {
    if (artistDataRes && artistPopularTrackRes) {
      setArtistData(artistDataRes);
      setArtistPopularTracks(artistPopularTrackRes.tracks);
    }
  }, [artistDataRes, artistPopularTrackRes]);

  if (!artistData && !artistPopularTracks) {
    return <Loader />;
  }
  return (
    <div className="flex-grow mt-10 sm:mt-20 px-8 pb-8 space-y-10  w-full max-w-[1440px] mx-auto">
      {/* Start Artist Details */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-10">
        <figure className="w-40 h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden">
          <img
            src={artistData.images[0].url}
            alt={artistData.name}
            className="w-full h-full object-cover aspect-auto"
          />
        </figure>
        <div className="text-white mt-5 sm:mt-0">
          <span className="text-base capitalize">{artistData.type}</span>
          <h2 className="font-bold text-4xl xl:text-8xl">{artistData.name}</h2>
          <p className="mt-4">
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(artistData.followers.total)}{" "}
            monthly listeners
          </p>
        </div>
      </div>
      {/* End Artist Details */}
      {/* Start play and follow button */}
      <div className="flex items-center space-x-10 mt-5">
        <button className="bg-[#1DB954] w-16 h-16 rounded-full flex justify-center items-center">
          <PlayIcon className="size-10" />
        </button>
        <button className="text-white border border-gray-400 px-8 py-2 rounded-3xl">
          Follow
        </button>
      </div>
      {/* End play and follow button */}
      {/* Start Popular songs */}
      <div className="mt-5">
        <h4 className="text-white text-2xl font-semibold">Popular</h4>
        <div className="mt-10 space-y-6">
          {artistPopularTracks
            .slice(0, seeMore ? artistPopularTracks.length : 5)
            .map((track: any, index: number) => {
              return (
                <div
                  className="flex items-center text-white relative"
                  key={track.id}
                >
                  <span className="text-gray-400 absolute left-0">
                    {index + 1}
                  </span>
                  <figure className="w-10 h-10 min-w-10 rounded-md overflow-hidden ml-10">
                    <img
                      src={track.album.images[0].url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <button
                    className="w-full lg:min-w-80 max-w-[800px] text-left ml-5"
                    onClick={() => handleClick(index)}
                  >
                    {track.name}
                  </button>
                  <p className="ml-5 hidden sm:block">{`${Math.floor(
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
        <button
          className="text-gray-400 hover:text-white text-sm font-medium mt-5"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See less" : "See more"}
        </button>
      </div>
      {/* End Popular songs */}
    </div>
  );
}

export default ArtistDetail;
