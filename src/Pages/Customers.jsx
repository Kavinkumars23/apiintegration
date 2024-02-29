// Customers.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../Components/Table";
import apiService from "../Constants/ApiServices";
import { tableColumns } from "../Constants/TableColumn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Customers = () => {
  const [tableRows, setTableRows] = useState([]);
  const { id } = useParams();
  const notify = () => toast.success("Deleted Successfully");
  const notifyDeleteError = () => toast.success("Delete Not Successful");

  useEffect(() => {
    console.log("fetch data in customer");
    apiService
      .getCustomersData(id)
      .then((data) => {
        setTableRows(data.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  function createCustomer(customerData) {
    apiService
      .createCustomer(customerData)
      .then((data) => {
        console.log(data);
        apiService.getCustomersData().then((data) => setTableRows(data.data));
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.message);
      });
  }

  function handleEdit(id, customerData) {
    apiService
      .putCustomer(id, customerData)
      .then((data) => {
        console.log(id, customerData, data);
        apiService.getCustomersData().then((data) => setTableRows(data.data));
      })
      .catch((error) => {
        console.log(customerData);
        console.log(error.response);
        console.log(error.message);
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
            notify();
            apiService
              .getCustomersData()
              .then((data) => setTableRows(data.data));
          })
          .catch((error) => {
            notifyDeleteError();
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
