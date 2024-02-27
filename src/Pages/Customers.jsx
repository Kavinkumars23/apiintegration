import React, { useState, useEffect } from "react";
import Table from "../Components/Table";
import axios from "axios";
import { tableColumns } from "../Constants/TableColumn";

const Customers = () => {
  const [tableRows, setTableRows] = useState([]);

  const token =
    "Bearer 11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887";
  const getCustomersData = () => {
    axios
      .get("https://gorest.co.in/public/v2/users", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setTableRows(data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCustomersData();
  }, []);

  function createCustomer(customerData) {
    axios
      .post("https://gorest.co.in/public/v2/users", customerData, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        console.log(data);
        getCustomersData();
      })
      .catch((error) => {
        console.log(error.response); // Log the error response
        console.log(error.message); // Log the error message
      });
  }

  function handleEdit(id, customerData) {
    axios
      .put(`https://gorest.co.in/public/v2/users/${id}`, customerData, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        console.log(id, customerData, data);
        getCustomersData();
      })
      .catch((error) => {
        console.log(customerData);
        console.log(error.response);
        console.log(error.message);
      });
  }

  function deleteCustomer(id) {
    axios
      .delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        getCustomersData();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full h-screen ">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <Table
          tableHeader={tableColumns}
          tableData={tableRows}
          addButton={true}
          addCustomer={createCustomer}
          deleteCustomer={deleteCustomer}
          editCustomer={handleEdit}
        />
      </div>
    </div>
  );
};

export default Customers;
