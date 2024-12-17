/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const playlistDetailApi = createApi({
  reducerPath: "PlaylistDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api`,
  }),
  keepUnusedDataFor: 14400,
  tagTypes: ["Playlist"],
  endpoints: (builder) => ({
    getPlaylistDetail: builder.query<any, string>({
      query: (id: string) => ({
        url: Number.isNaN(Number(id))
          ? `/playlist/${id}`
          : `/user-playlist/${id}/detail`,
        method: "GET",
      }),
      providesTags: ["Playlist"],
    }),
    addSongToUserPlaylist: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/user-playlist/${id}/addSongs`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Playlist"],
    }),
    deleteSongFromUserPlaylist: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user-playlist/${id}/deleteSong`,
        method: "DELETE",
      }),
      invalidatesTags: ['Playlist']
    }),
  }),
});

export const {
  useGetPlaylistDetailQuery,
  useAddSongToUserPlaylistMutation,
  useDeleteSongFromUserPlaylistMutation,
} = playlistDetailApi;
export default playlistDetailApi;
