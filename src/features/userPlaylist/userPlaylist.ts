import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPlaylistModalVisible: false,
  userPlaylists: null
};

const userPlaylists = createSlice({
  name: "UserPlaylists",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.createPlaylistModalVisible = action.payload;
    },
    setUserPlaylists: (state, action) => {
      state.userPlaylists = action.payload;
    },
  },
});

export const { setModalOpen, setUserPlaylists } = userPlaylists.actions;
export default userPlaylists;
