// Customers.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../Components/Table";
import apiService from "../Constants/ApiServices";
import { tableColumns } from "../Constants/TableConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { GetCustomerAction } from "../redux/action/GetCustomerAction";

const Customers = () => {
  const [tableRows, setTableRows] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CustomerStore.CustomerDataModel);

  useEffect(() => {
    dispatch(GetCustomerAction(id));
  }, [id]);

  
  useEffect(() => {
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      console.log(data.data);
      setTableRows(data.data);
    }
  }, [data]);


  function createCustomer(customerData) {
    apiService.createCustomer(customerData).then((data) => {
      console.log(data);
      apiService.getCustomersData().then((data) => setTableRows(data.data));
    });
  }

  function handleEdit(id, customerData) {
    apiService.putCustomer(id, customerData).then((data) => {
      console.log(id, customerData, data);
      apiService.getCustomersData().then((data) => setTableRows(data.data));
    });
  }

  function deleteCustomer(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiService
          .deleteCustomer(id)
          .then(() => {
            toast.success("Deleted Successfully");
            apiService
              .getCustomersData()
              .then((data) => setTableRows(data.data));
          })
          .catch((error) => {
            toast.success("Delete Not Successful");
            console.log(error);
          });
      }
    });
  }

  return (
    <div className="w-full h-screen ">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <Table
          tableHeader={tableColumns}
          tableData={tableRows}
          addButton={id ? false : true}
          addCustomer={createCustomer}
          deleteCustomer={deleteCustomer}
          editCustomer={handleEdit}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Customers;
