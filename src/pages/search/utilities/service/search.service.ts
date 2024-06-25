/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const searchApi = createApi({
  reducerPath: "Search",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getBrowseCategory: builder.query<any, void>({
      query: () => ({
        url: `/v1/browse/categories`,
        method: "GET",
      }),
    }),
    getSearchResult: builder.query<any, string>({
      query: (searchValue: string) => ({
        url: `/v1/search?q=${searchValue}&type=album,track,artist,playlist&limit=10&offset=0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrowseCategoryQuery, useLazyGetSearchResultQuery } = searchApi;
export default searchApi;
