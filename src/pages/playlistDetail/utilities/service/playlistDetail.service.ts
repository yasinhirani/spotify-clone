/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const playlistDetailApi = createApi({
  reducerPath: "PlaylistDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getPlaylistDetail: builder.query<any, string>({
      query: (id: string) => ({
        url: `/v1/playlists/${id}?market=IN`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlaylistDetailQuery } = playlistDetailApi;
export default playlistDetailApi;
