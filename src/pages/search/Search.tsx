/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetBrowseCategoryQuery } from "./utilities/service/search.service";
import Loader from "../../shared/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import HomePageListCard from "../../shared/components/HomePageListCard";
import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import { setMusicList } from "../../features/musicList/musicList";
// import { setSearchResult } from "../../features/search/search";

function Search() {
  const navigate = useNavigate();
  const searchState = useSelector((state: any) => state.SearchResult);
  const { data: browseCategoriesRes } = useGetBrowseCategoryQuery();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.Auth);
  const musicState = useSelector((state: any) => state.MusicList);

  const [browseCategories, setBrowseCategories] = useState<any>(null);

  const bgColors = [
    "bg-pink-600",
    "bg-green-700",
    "bg-purple-600",
    "bg-violet-600",
    "bg-blue-700",
  ];

  const handleClick = (index: number) => {
    if (!authState.authData) {
      navigate(FileRoutes.LOGIN);
      return;
    }

    const selectedMusic = searchState.searchResult.tracks.items[index];

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
        image: selectedMusic.album.images[0].url,
      },
      musicList: searchState.searchResult.tracks.items.map((track: any) => {
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
    if (browseCategoriesRes) {
      setBrowseCategories(browseCategoriesRes.categories.items);
    }
    // return () => {
    //   dispatch(setSearchResult(null));
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browseCategoriesRes]);

  if (!browseCategories) {
    return <Loader />;
  }
  return (
    <div className="flex-grow mt-28 px-8 pb-8">
      {!searchState.searchResult && (
        <>
          <h2 className="font-bold text-2xl text-white">Browse all</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
            {browseCategories.map((category: any) => {
              return (
                <div
                  role="button"
                  key={category.id}
                  className={`${
                    bgColors[Math.floor(Math.random() * bgColors.length)]
                  } p-3 aspect-[2/1] overflow-hidden rounded-md relative`}
                >
                  <figure className="w-28 h-28 absolute -right-8 bottom-0 rotate-[20deg]">
                    <img src={category.icons[0].url} alt={category.name} />
                  </figure>
                  <h4 className="text-white font-bold text-lg">
                    {category.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </>
      )}
      {searchState.searchResult && (
        <div>
          {/* Start songs */}
          <div>
            <h2 className="font-bold text-2xl text-white">Songs</h2>
            <div className="mt-5 space-y-5">
              {searchState.searchResult.tracks.items.map(
                (track: any, index: number) => {
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
                          src={track.album.images[0]?.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <button
                        className="w-full lg:min-w-80 text-left ml-8"
                        onClick={() => handleClick(index)}
                      >
                        <p className="font-semibold">{track.name}</p>
                        <p className="text-sm text-gray-400 hidden sm:block">
                          {track.artists
                            .map((artist: any) => artist.name)
                            .join(", ")}
                        </p>
                      </button>
                      <p className="ml-5 hidden md:block">{`${Math.floor(
                        track.duration_ms / 1000 / 60
                      )}:${
                        Math.floor((track.duration_ms / 1000) % 60) > 9
                          ? Math.floor((track.duration_ms / 1000) % 60)
                          : `0${Math.floor((track.duration_ms / 1000) % 60)}`
                      }`}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* End songs */}
          {/* Start Artists */}
          <div className="mt-10">
            <h2 className="font-bold text-2xl text-white">Artists</h2>
            <div className="scroll-card-grid mt-5">
              {searchState.searchResult.artists.items.map((artist: any) => {
                return (
                  <div
                    key={artist.id}
                    role="button"
                    onClick={() =>
                      navigate(`${FileRoutes.ARTIST}/${artist.id}`)
                    }
                    className="w-full"
                  >
                    {artist.images.length > 0 ? (
                      <figure className="rounded-full overflow-hidden">
                        <img
                          src={artist.images[0]?.url}
                          alt={artist.name}
                          className="aspect-square object-cover"
                        />
                      </figure>
                    ) : (
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex justify-center items-center font-semibold text-3xl bg-gray-400">
                        {artist.name
                          .split(" ")
                          .map((name: string) => name.charAt(0))
                          .join("")}
                      </div>
                    )}
                    <h3 className="font-medium text-lg text-white mt-3 whitespace-nowrap w-full overflow-hidden overflow-ellipsis text-left">
                      {artist.name}
                    </h3>
                    <h6 className="font-medium text-sm text-gray-400 capitalize">
                      {artist.type}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>
          {/* End Artists */}
          {/* Start albums */}
          <div className="mt-10">
            <h2 className="font-bold text-2xl text-white">Albums</h2>
            <div className="mt-5 scroll-card-grid">
              {searchState.searchResult.albums.items.map((album: any) => {
                return (
                  <HomePageListCard
                    key={album.id}
                    id={album.id}
                    imageUrl={album.images[0]?.url}
                    title={album.name}
                    type={album.type}
                    description={album.artists
                      .map((artist: any) => artist.name)
                      .join(", ")}
                  />
                );
              })}
            </div>
          </div>
          {/* End albums */}
          {/* Start playlists */}
          <div className="mt-10">
            <h2 className="font-bold text-2xl text-white">Playlists</h2>
            <div className="mt-5 scroll-card-grid">
              {searchState.searchResult.playlists.items.map((playlist: any) => {
                return playlist ? (
                  <HomePageListCard
                    key={playlist.id}
                    id={playlist.id}
                    imageUrl={playlist.images[0]?.url}
                    title={playlist.name}
                    type={playlist.type}
                    description={playlist.description}
                  />
                ) : null;
              })}
            </div>
          </div>
          {/* End playlists */}
        </div>
      )}
    </div>
  );
}

export default Search;
