import axios from "axios";
import { useGetAccessTokenMutation } from "./core.service";
import toast from "react-hot-toast";
import { navigate } from "../helpers/navigate";

const Interceptor = () => {
  const [getAccessToken] = useGetAccessTokenMutation();
  let token = "";

  axios.interceptors.request.use(async (req) => {
    if (req.url?.includes("api.spotify.com")) {
      token = localStorage.getItem("spotify_access_token") as string;
      if (!token) {
        token = await getAccessToken().then((res) => {
          return res.data.access_token;
        });
        localStorage.setItem("spotify_access_token", token);
      }
      req.headers.Authorization = `Bearer ${token}`;
    } else if(!req.url?.includes('accounts.spotify.com')) {
      const userData = JSON.parse(localStorage.getItem("user") as string);
      token = userData?.access_token;
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response.status === 400 || err.response.status === 404) {
        toast.error(err.response.data.message);
        return;
      }
      if (
        err.response.status === 401 &&
        !err.request.responseURL.includes("api.spotify.com")
      ) {
        toast.error(err.response.data.message);
        localStorage.removeItem('user');
        navigate && navigate('/login')
        return;
      }
      if (
        err.response.status === 401 &&
        err.request.responseURL.includes("api.spotify.com")
      ) {
        const token = await getAccessToken().then((res) => {
          return res.data.access_token;
        });
        localStorage.setItem("spotify_access_token", token);
        const originalRequest = err.config;
        return axios(originalRequest);
      }
      if(err.response.status === 403) {
        toast.error(err.response.data.message);
        navigate && navigate('/');
        return;
      }
      return Promise.reject(err);
    }
  );

  return null;
};

export default Interceptor;
