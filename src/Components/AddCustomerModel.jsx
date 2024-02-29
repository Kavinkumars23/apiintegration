import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";

const AddCustomerModel = ({
  closeCustomerModel,
  customerAction,
  button_mode,
  customerData,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^\S.*$/, "Not valid")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Name can only contain letters, numbers, and spaces"
      )
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .matches(/@(gmail\.com|outlook\.com)$/, "Host Not found")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    status: Yup.string().required("Status is required"),
  });

  //console.log(button_mode);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        if (button_mode === "Add") {
          console.log("add");
          await customerAction(formik.values);
        } else if (button_mode === "Edit") {
          console.log("kkk");
          await customerAction(customerData.id, formik.values);
        }
        closeCustomerModel();
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  });

  useEffect(() => {
    if (button_mode === "Edit" && customerData) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        ...customerData,
      }));
    }
  }, [button_mode, customerData, formik.setValues]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Add Customer Modal</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.gender && formik.errors.gender
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="" label="Select Gender" />
              <option value="male" label="Male" />
              <option value="female" label="Female" />
              <option value="other" label="Other" />
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.gender}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="" label="Select Status" />
              <option value="active" label="Active" />
              <option value="inactive" label="Inactive" />
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.status}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300"
            >
              Add
            </button>
            {/* <Button
              buttonName={
                button_mode === "add" ? "Add Customer" : "edit Customer"
              }
              buttonType={"submit"}
              buttonStyle={
                "bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300"
              }
            /> */}
            <Button
              buttonName={"Close"}
              buttonAction={closeCustomerModel}
              buttonType={"button"}
              buttonStyle={
                "bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300 px-8"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModel;
