/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../core/utilities/service/axios.service";
import axios from "axios";

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
  }),
});

export const { useGetMusicDataQuery } = musicApi;
export default musicApi;

export const fetchAlternateMusicUrl = async (songId: string) => {
  const res = await axios.post(
    "https://spotify-downloader-api-download-track-album-playlists.p.rapidapi.com/download_song",
    { song_id: songId },
    {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host":
        import.meta.env.VITE_RAPID_API_HOST,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
