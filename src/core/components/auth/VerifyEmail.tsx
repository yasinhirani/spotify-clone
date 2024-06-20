import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useSendVerificationEmailMutation } from "../../utilities/service/core.service";
import { Link } from "react-router-dom";
import { FileRoutes } from "../../utilities/constants/core.constants";

function VerifyEmail() {
  const [sendVerificationEmail] = useSendVerificationEmailMutation();

  const sendVerificationMail = () => {
    const email = localStorage.getItem("email");
    if (email) {
      sendVerificationEmail(email);
    }
  };
  return (
    <div className="main-bg flex justify-center items-center h-full">
      <div className="w-[500px] flex flex-col items-center p-5">
        <EnvelopeIcon className="text-white w-40 h-40" />
        <h4 className="text-white font-medium text-3xl mt-5">
          Verify your email address
        </h4>
        <p className="text-white font-normal text-lg mt-10">
          We have sent a verification link to your email. Simply click the link
          to complete the verification process. If you did not receive the
          email, check your spam folder or request a new verification link.
        </p>
        <button
          onClick={sendVerificationMail}
          className="w-full text-white font-semibold text-xl p-3 rounded-3xl border border-white hover:text-black hover:bg-white transition-colors mt-10"
        >
          Resend verification link
        </button>
        <Link to={FileRoutes.LOGIN} className="text-white mt-6">Email verified? <span className="underline">Login</span></Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
