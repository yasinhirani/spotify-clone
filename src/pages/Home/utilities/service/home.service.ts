/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const homepageApi = createApi({
  reducerPath: "HomePage",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://spotify-scraper.p.rapidapi.com",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getHomePageData: builder.query<any, void>({
      query: () => ({
        url: "/v1/home?region=IN",
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "x-rapidapi-host": import.meta.env.VITE_X_RAPIDAPI_HOSt,
        },
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery } = homepageApi;
export default homepageApi;
