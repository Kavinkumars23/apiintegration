import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddCustomerModel = ({ closeCustomerModel, customerAction, mode, customerData }) => {

    
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
        status: Yup.string().required('Status is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            gender: '',
            status: ''
        },
        validationSchema,
        onSubmit: () => {
            if (mode === 'Add') {
                customerAction(formik.values);
            } else if (mode === 'Edit') {
                customerAction(customerData.id, formik.values);
            }
            closeCustomerModel();
        },
    });

    useEffect(() => {
        if (mode === 'Edit' && customerData) {
            console.log(customerData);
            formik.setValues(customerData);
        }
    }, [mode, customerData, formik.setValues]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl mb-4">Add Customer Modal</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                                }`}
                            type="text"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                }`}
                            type="text"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''
                                }`}
                        >
                            <option value="" label="Select Gender" />
                            <option value="nale" label="Male" />
                            <option value="female" label="Female" />
                            <option value="other" label="Other" />
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                            <p className="text-red-500 text-xs italic">{formik.errors.gender}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                        <select
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.status && formik.errors.status ? 'border-red-500' : ''
                                }`}
                        >
                            <option value="" label="Select Status" />
                            <option value="active" label="Active" />
                            <option value="inactive" label="Inactive" />
                        </select>
                        {formik.touched.status && formik.errors.status && (
                            <p className="text-red-500 text-xs italic">{formik.errors.status}</p>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300"
                        >
                            {mode} Customer
                        </button>
                        <button
                            type="button"
                            className="bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300 px-8"
                            onClick={closeCustomerModel}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModel;
