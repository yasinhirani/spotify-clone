/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const artistDetailApi = createApi({
  reducerPath: "ArtistDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api`,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getArtistDetail: builder.query<any, string>({
      query: (id: string) => ({
        url: `/artist/${id}`,
        method: "GET",
      }),
    }),
    getArtistPopularTracks: builder.query<any, string>({
      query: (id: string) => ({
        url: `/artist/${id}/top-tracks`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetArtistDetailQuery, useGetArtistPopularTracksQuery } = artistDetailApi;
export default artistDetailApi;
