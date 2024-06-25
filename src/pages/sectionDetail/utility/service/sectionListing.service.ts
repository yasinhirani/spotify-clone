/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const sectionDetailApi = createApi({
  reducerPath: "SectionDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_TUNETIDE_BASE_URL}/api`,
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    getSectionOverview: builder.query<any, string>({
      query: (name: string) => ({
        url: `/homepage/detail/${name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSectionOverviewQuery } = sectionDetailApi;
export { sectionDetailApi };
