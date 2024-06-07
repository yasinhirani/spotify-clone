/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios.service";

const params = new URLSearchParams();
params.append("grant_type", "client_credentials");
params.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
params.append("client_secret", import.meta.env.VITE_SPOTIFY_CLIENT_SECRET);

const coreApi = createApi({
  reducerPath: "CoreApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://accounts.spotify.com/api",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<any, void>({
      query: () => ({
        url: "/token",
        method: "POST",
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const { useGetAccessTokenMutation } = coreApi;
export default coreApi;
