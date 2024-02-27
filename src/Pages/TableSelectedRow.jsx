import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tableColumns } from "../Constants/TableColumn";
import Table from "../Components/Table";

const TableSelectedRow = () => {
  const [tableRow, setTableRows] = useState([]);
  const { id } = useParams();

  const token =
    "Bearer 11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887";
  const getCustomersData = () => {
    axios
      .get(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setTableRows(data.data);
        console.log(data.data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCustomersData();
  }, [id]);

  return (
    <div className="w-full h-screen ">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <Table tableHeader={tableColumns} tableData={tableRow} />
      </div>
    </div>
  );
};

export default TableSelectedRow;
