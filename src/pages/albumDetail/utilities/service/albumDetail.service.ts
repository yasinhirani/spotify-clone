/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const albumDetailApi = createApi({
  reducerPath: "AlbumDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api`,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getAlbumDetail: builder.query<any, string>({
      query: (id: string) => ({
        url: `/album/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAlbumDetailQuery } = albumDetailApi;
export default albumDetailApi;
