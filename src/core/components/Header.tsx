/* eslint-disable @typescript-eslint/no-explicit-any */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { FileRoutes } from "../utilities/constants/core.constants";
import { useDispatch, useSelector } from "react-redux";
import debounce from "../../shared/utilities/functions/function";
import { useLazyGetSearchResultQuery } from "../../pages/search/utilities/service/search.service";
import { setSearchResult } from "../../features/search/search";
import { setAuthData } from "../../features/auth/auth";
import toast from "react-hot-toast";
// import { useLazyCreateSubscriptionQuery } from "../utilities/service/core.service";

function Header() {
  const location = useLocation();
  const [getSearchResult] = useLazyGetSearchResultQuery();
  // const [createSubscription] = useLazyCreateSubscriptionQuery();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.Auth);

  const handleSearch = async (searchValue: string) => {
    if (searchValue !== "") {
      await getSearchResult(searchValue).then((res) => {
        dispatch(setSearchResult(res.data));
      });
    } else {
      dispatch(setSearchResult(null));
    }
  };

  const handleLogout = () => {
    dispatch(setAuthData(null));
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
  };

  // const handlePremiumClick = async () => {
  //   await createSubscription().then((res: any) => {
  //     const options = {
  //       key: "rzp_test_YBlEH7KFuHj04V",
  //       subscription_id: res.data.data.subscriptionId,
  //       name: "Your Company Name",
  //       description: "Subscription",
  //       handler: function (response: any) {
  //         console.log(
  //           `Payment successful. Razorpay subscription ID: ${response.razorpay_subscription_id}`
  //         );
  //       },
  //       modal: {
  //         ondismiss: function () {
  //           console.log("Popup closed");
  //         },
  //       },
  //     };

  //     const rzp = new Razorpay(options);
  //     rzp.open();
  //   })
  // }

  return (
    <header
      className={`w-full bg-transparent ${
        location.pathname.includes(FileRoutes.SEARCH)
          ? "flex justify-between"
          : "hidden sm:flex justify-end"
      } items-center space-x-5 p-5 absolute top-0 left-0 right-0`}
    >
      {location.pathname.includes(FileRoutes.SEARCH) && (
        <div className="w-full sm:max-w-72 flex items-center space-x-3 bg-white rounded-3xl px-3 py-2">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            name="search"
            id="search"
            className="w-full outline-none"
            onChange={(e) => debounce(e.target.value, handleSearch)}
          />
        </div>
      )}
      {authState.authData ? (
        <div className="hidden md:flex items-center md:space-x-5">
          {/* <button
            className="text-sm bg-white text-black px-5 py-2 rounded-3xl font-semibold"
            onClick={handlePremiumClick}
          >
            Get Premium
          </button> */}
          <button
            className="text-sm bg-white text-black px-5 py-2 rounded-3xl font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            to={FileRoutes.REGISTER}
            className="text-sm bg-transparent px-5 py-2 text-gray-300 font-semibold whitespace-nowrap"
          >
            Sign up
          </Link>
          <Link
            to={FileRoutes.LOGIN}
            className="text-sm bg-white text-black px-5 py-2 rounded-3xl font-semibold"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
