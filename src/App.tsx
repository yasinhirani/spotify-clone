/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import SideBar from "./core/components/SideBar";
import Header from "./core/components/Header";
import Player from "./shared/components/Player";
import { useDispatch, useSelector } from "react-redux";
import BottomNavigation from "./core/components/BottomNavigation";
import { useEffect } from "react";
import { setAuthData } from "./features/auth/auth";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const musicState = useSelector((state: any) => state.MusicList);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("user") as string);
    if (authData) {
      dispatch(setAuthData(authData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="main-bg w-full h-full overflow-hidden flex flex-col">
      <div className="w-full flex-grow h-full flex overflow-hidden">
        <SideBar />
        <div className="flex-grow flex flex-col overflow-y-auto relative">
          <Header />
          <Outlet />
        </div>
      </div>
      {musicState.currentlyPlaying && (
        <div className="px-3 pb-2 md:p-0">
          <Player />
        </div>
      )}
      <div className="px-3 pb-2 md:p-0">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
