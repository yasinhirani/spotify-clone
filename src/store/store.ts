import { configureStore } from "@reduxjs/toolkit";
import { sectionDetailApi } from "../pages/sectionDetail/utility/service/sectionListing.service";
import {
  homepageApi,
  featuredPlaylistApi,
} from "../pages/Home/utilities/service/home.service";
import artistDetailApi from "../pages/artistDetail/utilities/service/artistDetail.service";
import coreApi from "../core/utilities/service/core.service";
import albumDetailApi from "../pages/albumDetail/utilities/service/albumDetail.service";
import playlistDetailApi from "../pages/playlistDetail/utilities/service/playlistDetail.service";
import musicListSlice from "../features/musicList/musicList";
import musicApi from "../shared/utilities/service/music.service";
import searchApi from "../pages/search/utilities/service/search.service";
import search from "../features/search/search";
import authSlice from "../features/auth/auth";

const store = configureStore({
  reducer: {
    [homepageApi.reducerPath]: homepageApi.reducer,
    [featuredPlaylistApi.reducerPath]: featuredPlaylistApi.reducer,
    [sectionDetailApi.reducerPath]: sectionDetailApi.reducer,
    [artistDetailApi.reducerPath]: artistDetailApi.reducer,
    [coreApi.reducerPath]: coreApi.reducer,
    [albumDetailApi.reducerPath]: albumDetailApi.reducer,
    [playlistDetailApi.reducerPath]: playlistDetailApi.reducer,
    [musicListSlice.name]: musicListSlice.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [search.name]: search.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homepageApi.middleware,
      featuredPlaylistApi.middleware,
      sectionDetailApi.middleware,
      artistDetailApi.middleware,
      coreApi.middleware,
      albumDetailApi.middleware,
      playlistDetailApi.middleware,
      musicApi.middleware,
      searchApi.middleware
    ),
});

export default store;
