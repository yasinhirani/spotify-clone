/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const albumDetailApi = createApi({
  reducerPath: "AlbumDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getAlbumDetail: builder.query<any, string>({
      query: (id: string) => ({
        url: `/v1/albums/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAlbumDetailQuery } = albumDetailApi;
export default albumDetailApi;
