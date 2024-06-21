/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import PreviousIcon from "./PreviousIcon";
import NextIcon from "./NextIcon";
import { useDispatch, useSelector } from "react-redux";
import { useGetMusicDataQuery } from "../utilities/service/music.service";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { setMusicList } from "../../features/musicList/musicList";

function Player() {
  const musicState = useSelector((state: any) => state.MusicList);

  const { data: musicData } = useGetMusicDataQuery(
    musicState.currentlyPlaying.name,
    { skip: !musicState.currentlyPlaying }
  );
  const dispatch = useDispatch();

  const [url, setUrl] = useState<string>("");
  const [playing, setPlaying] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);

  const audioRef = useRef<any>();

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const playPreviousSong = () => {
    setUrl("");
    audioRef.current.currentTime = 0;
    const indexOfCurrentSong = musicState.musicList.findIndex(
      (music: any) => music.id === musicState.currentlyPlaying.id
    );
    if (indexOfCurrentSong !== -1 && indexOfCurrentSong > 0) {
      dispatch(
        setMusicList({
          currentlyPlaying: musicState.musicList[indexOfCurrentSong - 1],
          musicList: musicState.musicList,
        })
      );
    } else {
      return;
    }
  };

  const updateProgressBar = (e: any) => {
    const { currentTime, duration } = e.target;
    const progress = Math.floor((currentTime / duration) * 100);
    setProgressValue(progress);
  };

  const playNextSong = () => {
    setUrl("");
    audioRef.current.currentTime = 0;
    const indexOfCurrentSong = musicState.musicList.findIndex(
      (music: any) => music.id === musicState.currentlyPlaying.id
    );
    if (indexOfCurrentSong !== -1) {
      dispatch(
        setMusicList({
          currentlyPlaying: musicState.musicList[indexOfCurrentSong + 1],
          musicList: musicState.musicList,
        })
      );
    } else {
      return;
    }
  };

  const skipMusic = (e: any) => {
    const { duration } = audioRef.current;
    audioRef.current.currentTime = (e.target.value * duration) / 100;
  };

  const setMusicUrl = async (musicData: any) => {
    if (musicData) {
      setUrl(musicData.downloadUrl[3].url);
    } else {
      setUrl(musicState.currentlyPlaying.preview_url);
    }
    const timeout = setTimeout(() => {
      handlePlay();
      clearTimeout(timeout);
    }, 100);
  };

  // const compareArtists = (songObj: any) => {
  //   const artistList = [...songObj.artists.primary];

  //   const artistsNames = artistList.map((artist) => artist.name);

  //   artistsNames.forEach((artist: any) => {
  //     if (musicState.currentlyPlaying.artist.includes(artist)) {
  //       return true;
  //     }
  //   });

  //   return false;
  // };

  useEffect(() => {
    setUrl("");
    if (musicData) {
      const perfectUrl = musicData.data.results.findIndex((track: any) => {
        return track.artists.primary.some(
          (artist: any) => artist.name === musicState.currentlyPlaying.artist[0]
        );
      });
      setMusicUrl(musicData.data.results[perfectUrl !== -1 ? perfectUrl : 0]);
    }
  }, [musicData, musicState.currentlyPlaying]);

  if (!url) {
    return (
      <div className="bg-black px-8 py-4 flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-black px-8 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center">
      {/* Start song title and image */}
      <audio
        ref={audioRef}
        className="hidden"
        src={url}
        onEnded={playNextSong}
        onTimeUpdate={updateProgressBar}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <div className="flex items-center space-x-5">
        <figure className="w-10 h-10 min-w-10 rounded overflow-hidden">
          <img src={musicState.currentlyPlaying.image} alt="Animal" />
        </figure>
        <div>
          <p className="text-white font-medium text-sm w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">
            {musicState.currentlyPlaying.name}
          </p>
          <p className="text-gray-400 text-sm w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis">
            {musicState.currentlyPlaying.artist.join(", ")}
          </p>
        </div>
      </div>
      {/* End song title and image */}
      {/* Start controls and progress bar */}
      <div className="w-full flex flex-col-reverse md:flex-col">
        <div className="flex justify-center items-center space-x-3 w-full">
          <button onClick={playPreviousSong}>
            <PreviousIcon className="w-10 h-10 text-white" />
          </button>
          {!playing && (
            <button onClick={handlePlay}>
              <PlayCircleIcon className="w-10 h-10 text-white" />
            </button>
          )}
          {playing && (
            <button onClick={handlePause}>
              <PauseCircleIcon className="w-10 h-10 text-white" />
            </button>
          )}
          <button onClick={playNextSong}>
            <NextIcon className="w-10 h-10 text-white" />
          </button>
        </div>
        {/* Start Progress bar */}
        {/* <div
          className="h-1 w-full bg-white bg-opacity-30 rounded-3xl overflow-hidden my-5 md:my-0 md:mt-5 cursor-pointer"
          onClick={(e) => console.log(e)}
        >
          <div
            className="bg-white h-full"
            style={{ width: `${progressValue}%` }}
          />
        </div> */}
        <input
          type="range"
          name="progress"
          id="progress"
          min={0}
          max={100}
          value={progressValue}
          style={{
            background: `linear-gradient(to right, #ffffff ${progressValue}%, rgba(255, 255, 255, 0.3) ${progressValue}%)`,
          }}
          className="h-1 my-5 md:my-0 md:mt-5"
          onChange={skipMusic}
        />
        {/* End Progress bar */}
      </div>
      {/* End controls and progress bar */}
      {/* Start cancel button */}
      {/* <button className="text-white justify-end hidden md:flex" onClick={() => {
        dispatch(
          setMusicList({
            currentlyPlaying: null,
            musicList: null,
          })
        );
      }}>
        <XMarkIcon className="w-6 h-6" />
      </button> */}
      {/* End cancel button */}
    </div>
  );
}

export default Player;
