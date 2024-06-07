import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: null,
};

const search = createSlice({
  name: "SearchResult",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchResult } = search.actions;
export default search;
