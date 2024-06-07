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
    }),
    // getMusicUrl: builder.mutation<any, any>({
    //   query: (data: any) => ({
    //     url: "/getsong",
    //     method: "POST",
    //     data,
    //     headers: {
    //       "x-rapidapi-key":
    //         "b270c8a6c1mshfa428feb3857501p110f3cjsn471755706752",
    //       "x-rapidapi-host": "jio-saavan-unofficial.p.rapidapi.com",
    //     },
    //   }),
    // }),
  }),
});

export const { useGetMusicDataQuery } = musicApi;
export default musicApi;
