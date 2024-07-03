/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const homepageApi = createApi({
  reducerPath: "HomePage",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getHomePageData: builder.query<any, void>({
      query: () => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/homepage`,
        method: "GET",
      }),
    }),
    getFeaturedPlaylistData: builder.query<any, number>({
      query: (limit: number) => ({
        url: `https://api.spotify.com/v1/browse/featured-playlists?locale=en_IN&limit=${limit}&offset=0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery, useGetFeaturedPlaylistDataQuery } =
  homepageApi;

export { homepageApi };
