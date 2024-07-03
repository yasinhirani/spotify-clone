import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
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
import ProtectedRoute from "./core/components/ProtectedRoute";
import MyPlaylist from "./pages/myPlaylist/MyPlaylist";

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
        window.innerWidth < 768
          ? {
              path: `${FileRoutes.MY_PLAYLIST}`,
              element: <MyPlaylist />,
            }
          : {},
        {
          path: "*",
          element: (
            <h3 className="text-white font-medium text-xl mt-20 px-8">
              Route that you are looking for is not available, <Link to={FileRoutes.HOME} className="underline">Go to Home</Link>
            </h3>
          ),
        },
      ],
    },
    { path: FileRoutes.LOGIN, element: <ProtectedRoute Children={Login} /> },
    {
      path: FileRoutes.REGISTER,
      element: <ProtectedRoute Children={Signup} />,
    },
    {
      path: FileRoutes.VERIFY_EMAIL,
      element: <ProtectedRoute Children={VerifyEmail} />,
    },
    {
      path: "*",
      element: <h3 className="font-medium text-xl mt-20 px-8">Not found</h3>,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default AppRoutes;
