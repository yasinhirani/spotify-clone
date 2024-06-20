import * as Yup from "yup";

const loginValidations = Yup.object({
  email: Yup.string()
    .required("Email address is required")
    .matches(/^\S*$/, "Enter a valid email address")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Enter a valid password"),
});

const signupValidations = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z]+ ?[a-zA-Z]+$/, "Enter a valid name"),
  email: Yup.string()
    .required("Email address is required")
    .matches(/^\S*$/, "Enter a valid email address")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Enter a valid password"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .matches(/^\S*$/, "Enter a valid password")
    .oneOf([Yup.ref("password")], "Confirm password and password must match"),
});
export { loginValidations, signupValidations };
