/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const homepageApi = createApi({
  reducerPath: "HomePage",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getHomePageData: builder.query<any, void>({
      query: () => ({
        url: "/homepage",
        method: "GET",
      }),
    }),
  }),
});

const featuredPlaylistApi = createApi({
  reducerPath: "FeaturedPlaylist",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getFeaturedPlaylistData: builder.query<any, void>({
      query: () => ({
        url: "/v1/browse/featured-playlists?locale=en_IN&limit=5&offset=0",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery } = homepageApi;
export const { useGetFeaturedPlaylistDataQuery } = featuredPlaylistApi;
export { homepageApi, featuredPlaylistApi };
