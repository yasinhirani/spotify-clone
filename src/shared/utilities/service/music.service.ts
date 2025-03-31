/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../core/utilities/service/axios.service";

const musicApi = createApi({
  reducerPath: "MusicApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}`,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getMusicData: builder.query<any, string>({
      query: (musicName: string) => ({
        url: `/api/search/song?query=${musicName}`,
        method: "GET",
      }),
    }),
    getAlternateUrl: builder.query<any, {songName: string, artistName: string}>({
      query: ({songName, artistName}) => ({
        url: `/api/search/song/alternate?songName=${songName}&artistName=${artistName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetMusicDataQuery, useLazyGetAlternateUrlQuery } = musicApi;
export default musicApi;