import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import apiService from "../Constants/ApiServices";
import {
  LoginButton,
  PasswordLabal,
  UserNameLabal,
} from "../Constants/TableConstants";
import { useFormik } from "formik";

const Login = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/, "Enter valid mail id"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])\S*$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      apiService.login(username, password).then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", `Bearer ${response.data.token}`);
          setIsSignedIn(true);
          navigate(`/Home`);
        }
      });
    },
  });

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen bg-slate-500">
        <div className="max-w-screen-lg p-10 mx-auto flex flex-col justify-center items-center w-auto h-auto bg-slate-100 rounded-lg shadow-lg">
          <h1>{LoginButton}</h1>
          <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <label htmlFor="username">{UserNameLabal}</label>
              <input
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">{PasswordLabal}</label>
              <input
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300"
            >
              {LoginButton}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
