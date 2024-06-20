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
        url: "http://localhost:8080/api/user/signup",
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "http://localhost:8080/api/user/login",
        method: "POST",
        data,
      }),
    }),
    sendVerificationEmail: builder.mutation<any, string>({
      query: (email: string) => ({
        url: "http://localhost:8080/api/user/sendVerificationEmail",
        method: "POST",
        data: { email },
      }),
    }),
    createSubscription: builder.query<any, void>({
      query: () => ({
        url: "http://localhost:8080/api/create-subscription",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAccessTokenMutation,
  useSignupMutation,
  useLoginMutation,
  useSendVerificationEmailMutation,
  useLazyCreateSubscriptionQuery
} = coreApi;
export default coreApi;
