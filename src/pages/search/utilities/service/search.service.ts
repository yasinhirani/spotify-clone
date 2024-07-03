/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const searchApi = createApi({
  reducerPath: "Search",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getBrowseCategory: builder.query<any, void>({
      query: () => ({
        url: `${import.meta.env.VITE_SPOTIFY_BASE_URL}/v1/browse/categories`,
        method: "GET",
      }),
    }),
    getSearchResult: builder.query<any, string>({
      query: (searchValue: string) => ({
        url: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api/search?query=${searchValue}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrowseCategoryQuery, useLazyGetSearchResultQuery } = searchApi;
export default searchApi;
