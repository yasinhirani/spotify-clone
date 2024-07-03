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
    baseUrl: "",
  }),
  keepUnusedDataFor: 14400,
  tagTypes: ["UserPlaylist"],
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<any, void>({
      query: () => ({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    signup: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/user/signup`,
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/user/login`,
        method: "POST",
        data,
      }),
    }),
    sendVerificationEmail: builder.mutation<any, string>({
      query: (email: string) => ({
        url: `${
          import.meta.env.VITE_TUNETIDE_BASE_URL
        }/api/user/sendVerificationEmail`,
        method: "POST",
        data: { email },
      }),
    }),
    createSubscription: builder.query<any, void>({
      query: () => ({
        url: `${
          import.meta.env.VITE_TUNETIDE_BASE_URL
        }/api/create-subscription`,
        method: "GET",
      }),
    }),
    getUserPlaylists: builder.query<any, string>({
      query: (userId: string) => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/user-playlist/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserPlaylist"],
    }),
    createUserPlaylist: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/user-playlist/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["UserPlaylist"],
    }),
  }),
});

export const {
  useGetAccessTokenMutation,
  useSignupMutation,
  useLoginMutation,
  useSendVerificationEmailMutation,
  useLazyCreateSubscriptionQuery,
  useGetUserPlaylistsQuery,
  useCreateUserPlaylistMutation
} = coreApi;
export default coreApi;
