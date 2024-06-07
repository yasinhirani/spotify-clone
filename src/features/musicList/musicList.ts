import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentlyPlaying: null,
  musicList: [],
};

const musicListSlice = createSlice({
  name: "MusicList",
  initialState,
  reducers: {
    setMusicList: (state, action) => {
      state.currentlyPlaying = action.payload.currentlyPlaying;
      state.musicList = action.payload.musicList;
    },
  },
});

export const { setMusicList } = musicListSlice.actions;
export default musicListSlice;