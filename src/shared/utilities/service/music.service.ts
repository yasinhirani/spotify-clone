/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../core/utilities/service/axios.service";

const musicApi = createApi({
  reducerPath: "MusicApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://saavn.dev",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getMusicData: builder.query<any, string>({
      query: (musicName: string) => ({
        url: `/api/search/songs?query=${musicName}`,
        method: "GET",
      }),
    })
  }),
});

export const { useGetMusicDataQuery } = musicApi;
export default musicApi;
