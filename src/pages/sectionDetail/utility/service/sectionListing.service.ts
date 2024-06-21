/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const sectionDetailApi = createApi({
  reducerPath: "SectionDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api`,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getSectionOverview: builder.query<any, string>({
      query: (name: string) => ({
        url: `/homepage/detail/${name}`,
        method: "GET",
      }),
    }),
  }),
});

const sectionPlaylistDetailApi = createApi({
  reducerPath: "SectionPlaylistDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getSectionPlaylistOverview: builder.query<any, any>({
      query: () => ({
        url: `/v1/browse/featured-playlists?locale=en_IN&limit=20&offset=0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSectionOverviewQuery } = sectionDetailApi;
export const { useGetSectionPlaylistOverviewQuery } = sectionPlaylistDetailApi;
export { sectionDetailApi, sectionPlaylistDetailApi };
