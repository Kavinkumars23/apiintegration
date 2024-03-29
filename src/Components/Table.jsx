import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import AddCustomerModel from "./AddCustomerModel";
import Button from "./Button";
import { additionalStatusOptions, id } from "../Constants/TableConstants";

const ItemsPerPage = 5;

const Table = ({
  tableHeader,
  tableData,
  addButton,
  addCustomer,
  deleteCustomer,
  editCustomer,
}) => {
  const [state, setState] = useState({
    searchTerm: "",
    currentPage: 1,
    isModalOpen: false,
    editModeData: null,
    button_mode: "add",
  });

  const openModal = (mode, customerData) => {
    setState((prevState) => ({
      ...prevState,
      editModeData: customerData,
      button_mode: mode,
      isModalOpen: true,
    }));
  };

  const handleStatusChange = (e, customerId) => {
    const updatedCustomerData = tableData.map((customer) => {
      if (customer.id === customerId) {
        return { ...customer, status: e.target.value };
      }
      return customer;
    });
    // Call editCustomer with the updated data
    editCustomer(
      customerId,
      updatedCustomerData.find((customer) => customer.id === customerId)
    );
  };

  const handleEdit = (index) => {
    const customerData = Array.isArray(tableData)
      ? tableData[index]
      : tableData;
    openModal("Edit", customerData);
  };

  const filteredData = Array.isArray(tableData)
    ? tableData.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      )
    : [tableData];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const data = filteredData.slice(
    (state.currentPage - 1) * ItemsPerPage,
    state.currentPage * ItemsPerPage
  );

  const visiblePageRange = 2;
  const startPage = Math.max(1, state.currentPage - visiblePageRange);
  const endPage = Math.min(totalPages, state.currentPage + visiblePageRange);

  const startingSerialNumber = (state.currentPage - 1) * ItemsPerPage + 1;

  let page = [];
  for (let i = startPage; i <= endPage; i++) {
    page.push(i);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <input
            className="bg-gray-700 rounded-lg p-2 mb-3"
            type="text"
            placeholder="Search..."
            value={state.searchTerm}
            onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
          />
        </div>
        <div>
          {addButton && (
            <Button
              buttonName="Add Customer"
              buttonAction={() => openModal("add", null)}
              buttonType="button"
              buttonStyle="bg-gray-700 rounded-lg p-2 mb-3 text-gray-400 ms-3 hover:scale-110 duration-300"
            />
          )}
        </div>
      </div>
      <div className=" overflow-x-auto rounded-lg">
        <div className="">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th className="px-6 py-3">{id}</th>
                {tableHeader &&
                  Array.isArray(tableHeader) &&
                  tableHeader.map((header) => (
                    <th className="px-6 py-3" key={header}>
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                Array.isArray(data) &&
                data.map((row, index) => (
                  <tr
                    className="border-b bg-gray-800 border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                      {startingSerialNumber + index}
                    </td>
                    {tableHeader &&
                      Array.isArray(tableHeader) &&
                      tableHeader.map((header) => (
                        <td
                          className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          key={header}
                        >
                          {header === "edit" ? (
                            <FaEdit
                              className="cursor-pointer"
                              onClick={() => handleEdit(index)}
                            />
                          ) : header === "status" ? (
                            <select
                              value={row[header]}
                              onChange={(e) => handleStatusChange(e, row["id"])}
                              className="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <option value={row[header]}>{row[header]}</option>
                              {additionalStatusOptions &&
                                Array.isArray(additionalStatusOptions) &&
                                additionalStatusOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                            </select>
                          ) : header === "delete" ? (
                            <MdDeleteSweep
                              className="cursor-pointer"
                              onClick={() => deleteCustomer(row.id)}
                              size={25}
                            />
                          ) : (
                            row[header]
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <ul className=" flex ">
          {page &&
            Array.isArray(page) &&
            page.map((page_number) => (
              <li className="p-2" key={page_number}>
                <button
                  onClick={() =>
                    setState({ ...state, currentPage: page_number })
                  }
                >
                  {page_number}
                </button>
              </li>
            ))}
        </ul>
      </div>
      {state.isModalOpen && (
        <AddCustomerModel
          closeCustomerModel={() => {
            setState({ ...state, isModalOpen: false });
          }}
          customerAction={
            state.button_mode === "add" ? addCustomer : editCustomer
          }
          button_mode={state.button_mode}
          customerData={state.editModeData}
        />
      )}
    </div>
  );
};

export default Table;
