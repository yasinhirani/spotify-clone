/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import SideBar from "./core/components/SideBar";
import Header from "./core/components/Header";
import Player from "./shared/components/Player";
import { useDispatch, useSelector } from "react-redux";
import BottomNavigation from "./core/components/BottomNavigation";
import { useEffect, useState } from "react";
import { setAuthData } from "./features/auth/auth";
import "./App.css";
import CreatePlaylist from "./shared/components/CreatePlaylist";
import { useGetUserPlaylistsQuery } from "./core/utilities/service/core.service";
import { setUserPlaylists } from "./features/userPlaylist/userPlaylist";
import LogoutConfirmation from "./shared/components/LogoutConfirmation";

function App() {
  const dispatch = useDispatch();

  const musicState = useSelector((state: any) => state.MusicList);
  const createPlaylistModalState = useSelector(
    (state: any) => state.UserPlaylists
  );
  const authState = useSelector((state: any) => state.Auth);

  const [logoutConfirmationOpen, setLogoutConfirmationOpen] =
    useState<boolean>(false);

  const { data: userPlaylistsRes } = useGetUserPlaylistsQuery("1", {
    skip: !authState.authData,
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("user") as string);
    if (authData) {
      dispatch(setAuthData(authData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userPlaylistsRes) {
      dispatch(setUserPlaylists(userPlaylistsRes.data.playlists));
    }
  }, [userPlaylistsRes, dispatch]);
  return (
    <div className="main-bg w-full h-full overflow-hidden flex flex-col">
      <div className="w-full flex-grow h-full flex overflow-hidden">
        <SideBar />
        <div className="flex-grow flex flex-col overflow-y-auto relative">
          <Header setLogoutConfirmationOpen={setLogoutConfirmationOpen} />
          <Outlet />
        </div>
      </div>
      {musicState.currentlyPlaying && (
        <div className="px-3 pb-2 md:p-0">
          <Player />
        </div>
      )}
      <div className="px-3 pb-2 md:p-0">
        <BottomNavigation
          setLogoutConfirmationOpen={setLogoutConfirmationOpen}
        />
      </div>
      {createPlaylistModalState.createPlaylistModalVisible && (
        <CreatePlaylist />
      )}
      {logoutConfirmationOpen && (
        <LogoutConfirmation
          setLogoutConfirmationOpen={setLogoutConfirmationOpen}
        />
      )}
    </div>
  );
}

export default App;
