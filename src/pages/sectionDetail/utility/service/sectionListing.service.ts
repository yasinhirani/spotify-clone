import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../core/utilities/service/axios.service";

const sectionDetailApi = createApi({
  reducerPath: "SectionDetail",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://spotify-scraper.p.rapidapi.com",
  }),
  keepUnusedDataFor: 14400,
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSectionOverview: builder.query<any, string>({
      query: (id: string) => ({
        url: `/v1/home/section?sectionId=${id}&region=IN`,
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "x-rapidapi-host": import.meta.env.VITE_X_RAPIDAPI_HOSt,
        },
      }),
    }),
  }),
});

export const { useGetSectionOverviewQuery } = sectionDetailApi;
export default sectionDetailApi;
