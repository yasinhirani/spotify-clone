import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { FileRoutes } from "./core/utilities/constants/core.constants";
import Home from "./pages/Home/Home";
import SectionListing from "./pages/sectionDetail/SectionListing";
import ArtistDetail from "./pages/artistDetail/ArtistDetail";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";
import PlaylistDetail from "./pages/playlistDetail/PlaylistDetail";
import Search from "./pages/search/Search";
import Login from "./core/components/auth/Login";
import Signup from "./core/components/auth/Signup";
import VerifyEmail from "./core/components/auth/VerifyEmail";

function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: FileRoutes.HOME,
      element: <App />,
      children: [
        {
          path: FileRoutes.HOME,
          element: <Home />,
        },
        {
          path: `${FileRoutes.SECTION_CONTENT}/:sectionName`,
          element: <SectionListing />,
        },
        {
          path: `${FileRoutes.ARTIST}/:artistId`,
          element: <ArtistDetail />,
        },
        {
          path: `${FileRoutes.ALBUM}/:albumId`,
          element: <AlbumDetail />,
        },
        {
          path: `${FileRoutes.PLAYLIST}/:playlistId`,
          element: <PlaylistDetail />,
        },
        {
          path: `${FileRoutes.SEARCH}`,
          element: <Search />,
        },
      ],
    },
    { path: FileRoutes.LOGIN, element: <Login /> },
    { path: FileRoutes.REGISTER, element: <Signup /> },
    { path: FileRoutes.VERIFY_EMAIL, element: <VerifyEmail /> },
  ]);
  return <RouterProvider router={routes} />;
}

export default AppRoutes;
