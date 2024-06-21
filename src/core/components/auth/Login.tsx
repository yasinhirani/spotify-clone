/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from "formik";
import { loginValidations } from "../../utilities/validations/auth.validations";
import { useLoginMutation } from "../../utilities/service/core.service";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../features/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { FileRoutes } from "../../utilities/constants/core.constants";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data: loginRes }] = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any) => {
    await login(values);
  };

  useEffect(() => {
    if (loginRes) {
      if (loginRes.data.emailVerified) {
        toast.success(loginRes.message);
        dispatch(setAuthData(loginRes.data));
        navigate(FileRoutes.HOME);
        localStorage.setItem("user", JSON.stringify(loginRes.data));
      } else {
        localStorage.setItem("email", loginRes.data.email);
        navigate(FileRoutes.VERIFY_EMAIL);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginRes]);

  return (
    <div className="main-bg flex justify-center items-center h-full">
      <div className="w-[400px] p-5">
        <h2 className="text-white font-semibold text-5xl text-center">
          TuneTide
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidations}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => {
            return (
              <Form className="mt-20 space-y-10">
                <div className="relative">
                  <p className="text-white font-medium mb-2">Email Address:</p>
                  <Field
                    className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                    name="email"
                    id="email"
                    value={values.email}
                    autoComplete="off"
                  />
                  {errors.email && touched.email ? (
                    <p className="font-semibold text-xs text-red-500 absolute -bottom-5">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="relative">
                  <p className="text-white font-medium mb-2">Password:</p>
                  <Field
                    type="password"
                    className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                    name="password"
                    id="password"
                    value={values.password}
                    autoComplete="off"
                  />
                  {errors.password && touched.password ? (
                    <p className="font-semibold text-xs text-red-500 absolute -bottom-5">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-semibold text-xl p-3 rounded-3xl border border-white hover:text-black hover:bg-white transition-colors"
                >
                  Login
                </button>
                <p className="text-center text-white">
                  Don't have an account?{" "}
                  <Link to={FileRoutes.REGISTER} className="underline">
                    Sign up
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
