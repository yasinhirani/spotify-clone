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
  const [duration, setDuration] = useState<{
    minutes: string;
    seconds: string;
  }>({
    minutes: "0",
    seconds: "00",
  });
  const [mediaLoading, setMediaLoading] = useState<boolean>(false);

  const audioRef = useRef<any>();
  const intervalRef = useRef<any>();

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setPlaying(true);
    intervalRef.current = setInterval(updateTime, 1000);
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaying(false);
    clearInterval(intervalRef.current);
  };

  const playPreviousSong = () => {
    audioRef.current.currentTime = 0;
    const indexOfCurrentSong = musicState.musicList.findIndex(
      (music: any) => music.id === musicState.currentlyPlaying.id
    );
    if (indexOfCurrentSong !== -1) {
      if (indexOfCurrentSong > 0) {
        dispatch(
          setMusicList({
            currentlyPlaying: musicState.musicList[indexOfCurrentSong - 1],
            musicList: musicState.musicList,
          })
        );
      } else {
        dispatch(
          setMusicList({
            currentlyPlaying:
              musicState.musicList[musicState.musicList.length - 1],
            musicList: musicState.musicList,
          })
        );
      }
    } else {
      return;
    }
  };

  const playNextSong = () => {
    audioRef.current.currentTime = 0;
    const indexOfCurrentSong = musicState.musicList.findIndex(
      (music: any) => music.id === musicState.currentlyPlaying.id
    );
    if (indexOfCurrentSong !== -1) {
      if (indexOfCurrentSong < musicState.musicList.length - 1) {
        dispatch(
          setMusicList({
            currentlyPlaying: musicState.musicList[indexOfCurrentSong + 1],
            musicList: musicState.musicList,
          })
        );
      } else {
        dispatch(
          setMusicList({
            currentlyPlaying: musicState.musicList[0],
            musicList: musicState.musicList,
          })
        );
      }
    } else {
      return;
    }
  };

  const updateTime = () => {
    const minutes = Math.floor(audioRef.current.currentTime / 60);
    const seconds = Math.floor(audioRef.current.currentTime - minutes * 60);
    setDuration({
      minutes: minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    });
  };

  const updateProgressBar = (e: any) => {
    const { currentTime, duration } = e.target;
    const progress = Math.floor((currentTime / duration) * 100);
    setProgressValue(progress);
  };

  const skipMusic = (e: any) => {
    const { duration } = audioRef.current;
    audioRef.current.currentTime = (e.target.value * duration) / 100;
  };

  const handleMediaLoaded = () => {
    setMediaLoading(false);
    const timeout = setTimeout(() => {
      handlePlay();
      clearTimeout(timeout);
    }, 100);
  };

  const setMusicUrl = async (musicData: any) => {
    if (musicData) {
      setUrl(musicData.downloadUrl[3].url);
    } else {
      setUrl(musicState.currentlyPlaying.preview_url);
    }
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
    setDuration({
      minutes: "0",
      seconds: "00",
    });
    setMediaLoading(true);
    if (musicData) {
      const perfectUrl = musicData.data.results.findIndex((track: any) => {
        return track.artists.primary.some(
          (artist: any) => artist.name === musicState.currentlyPlaying.artist[0]
        );
      });
      setMusicUrl(musicData.data.results[perfectUrl !== -1 ? perfectUrl : 0]);
    }

    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", handlePlay);
      navigator.mediaSession.setActionHandler("pause", handlePause);
      navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
      navigator.mediaSession.setActionHandler(
        "previoustrack",
        playPreviousSong
      );
      navigator.mediaSession.metadata = new MediaMetadata({
        title: musicState.currentlyPlaying.name,
        artist: musicState.currentlyPlaying.artist.join(", "),
        artwork: [{ src: musicState.currentlyPlaying.image }],
      });
    }

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.metadata = null;
      clearInterval(intervalRef.current);
    };
  }, [musicData, musicState.currentlyPlaying]);

  if (!url) {
    return (
      <div className="bg-black px-8 py-4 flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-black px-8 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center rounded-lg md:rounded-none">
      {/* Start song title and image */}
      <audio
        ref={audioRef}
        src={url}
        className="hidden"
        onEnded={playNextSong}
        onTimeUpdate={updateProgressBar}
        // onPause={handleOnPause}
        // onPlay={handleOnPlay}
        onLoadedMetadata={handleMediaLoaded}
      />
      <div className="flex items-center space-x-5">
        <figure className="w-10 h-10 min-w-10 rounded overflow-hidden">
          <img src={musicState.currentlyPlaying.image} alt="Animal" />
        </figure>
        <div>
          <p className="text-white font-medium text-sm w-full max-w-56 sm:max-w-60 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {musicState.currentlyPlaying.name}
          </p>
          <p className="text-gray-400 text-sm w-full max-w-56 sm:max-w-60 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {musicState.currentlyPlaying.artist.join(", ")}
          </p>
        </div>
      </div>
      {/* End song title and image */}
      {/* Start controls and progress bar */}
      <div className="w-full flex flex-col-reverse md:flex-col">
        <div className="flex justify-center items-center space-x-3 w-full">
          <button onClick={playPreviousSong} aria-label="Previous">
            <PreviousIcon className="w-10 h-10 text-white" />
          </button>
          {!playing && !mediaLoading && (
            <button onClick={handlePlay}>
              <PlayCircleIcon className="w-10 h-10 text-white" />
            </button>
          )}
          {playing && !mediaLoading && (
            <button onClick={handlePause}>
              <PauseCircleIcon className="w-10 h-10 text-white" />
            </button>
          )}
          {mediaLoading && <div className="spinner" />}
          <button onClick={playNextSong} aria-label="Next">
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
        <div>
          <input
            type="range"
            name="progress"
            id="progress"
            min={0}
            max={100}
            value={progressValue || 0}
            style={{
              background: `linear-gradient(to right, #ffffff ${
                progressValue || 0
              }%, rgba(255, 255, 255, 0.3) ${progressValue || 0}%)`,
            }}
            className="w-full h-1 my-5 md:my-0 md:mt-5"
            onChange={skipMusic}
          />
          <div className="flex justify-between items-center text-white text-sm">
            <p>
              {duration.minutes}:{duration.seconds}
            </p>
            <p>
              {Math.floor(musicState.currentlyPlaying.duration_ms / 1000 / 60)}:
              {`${
                Math.floor(
                  (musicState.currentlyPlaying.duration_ms / 1000) % 60
                ) > 9
                  ? Math.floor(
                      (musicState.currentlyPlaying.duration_ms / 1000) % 60
                    )
                  : `0${Math.floor(
                      (musicState.currentlyPlaying.duration_ms / 1000) % 60
                    )}`
              }`}
            </p>
          </div>
        </div>
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
