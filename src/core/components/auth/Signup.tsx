/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from "formik";
import { signupValidations } from "../../utilities/validations/auth.validations";
import { useSignupMutation } from "../../utilities/service/core.service";
import { Link, useNavigate } from "react-router-dom";
import { FileRoutes } from "../../utilities/constants/core.constants";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any) => {
    await signup({
      name: values.name,
      email: values.email,
      password: values.password,
    }).then((res: any) => {
      toast.success(res.data.message);
      localStorage.setItem("email", values.email);
      navigate(FileRoutes.VERIFY_EMAIL);
    });
  };

  return (
    <div className="main-bg flex justify-center sm:items-center sm:h-full">
      <div className="w-[400px] p-5">
        <h2 className="text-white font-semibold text-5xl text-center">
          TuneTide
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidations}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => {
            return (
              <Form className="mt-20 space-y-10">
                <div className="relative">
                  <p className="text-white font-medium mb-2">Your Name:</p>
                  <Field
                    className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                    name="name"
                    id="name"
                    value={values.name}
                    autoComplete="off"
                  />
                  {errors.name && touched.name ? (
                    <p className="font-semibold text-xs text-red-500 absolute -bottom-5">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
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
                <div className="relative">
                  <p className="text-white font-medium mb-2">
                    Confirm Password:
                  </p>
                  <Field
                    type="password"
                    className="w-full bg-transparent border border-gray-400 rounded-md px-2 py-2 focus:outline-none text-white text-sm"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    autoComplete="off"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="font-semibold text-xs text-red-500 absolute -bottom-5">
                      {errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
                <button type="submit" className="w-full text-white font-semibold text-xl p-3 rounded-3xl border border-white hover:text-black hover:bg-white transition-colors">
                  Signup
                </button>
                <p className="text-center text-white">
                  Already have an account?{" "}
                  <Link to={FileRoutes.LOGIN} className="underline">
                    Login
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

export default Signup;
