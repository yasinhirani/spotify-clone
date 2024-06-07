/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import SideBar from "./core/components/SideBar";
import Header from "./core/components/Header";
import Player from "./shared/components/Player";
import { useSelector } from "react-redux";
import BottomNavigation from "./core/components/BottomNavigation";

function App() {
  const musicState = useSelector((state: any) => state.MusicList);
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="w-full flex-grow h-full flex overflow-hidden">
        <SideBar />
        <div className="main-bg flex-grow flex flex-col overflow-y-auto relative">
          <Header />
          <Outlet />
        </div>
      </div>
      {musicState.currentlyPlaying && <Player />}
      <BottomNavigation />
    </div>
  );
}

export default App;
