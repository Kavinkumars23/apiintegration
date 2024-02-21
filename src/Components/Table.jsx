import React, { useState, useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import AddCustomerModel from './AddCustomerModel';
import { UserContext } from '../App';

const ItemsPerPage = 5;

const Table = ({ tableHeader, tableData, addButton, addCustomer, deleteCustomer, editCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModeData, setEditModeData] = useState(null);
    const [mode, setMode] = useState('Add');
 
    const openModal = (mode, customerData) => {
        setEditModeData(customerData);
        setMode(mode); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (index) => {
        const customerData = tableData[index];
        openModal('Edit', customerData);
    };

    const filters = useContext(UserContext);
    console.log(filters);

    
    const filteredData = tableData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / ItemsPerPage);

    const data = filteredData.slice((currentPage - 1) * ItemsPerPage, (currentPage * ItemsPerPage));

    const visiblePageRange = 2;
    const startPage = Math.max(1, currentPage - visiblePageRange);
    const endPage = Math.min(totalPages, currentPage + visiblePageRange);

    const startingSerialNumber = (currentPage - 1) * ItemsPerPage + 1;

    let page = [];
    for (let i = startPage; i <= endPage; i++) {
        page.push(i);
    }

    return (
        <div className=' w-full'>
            <div className=" flex justify-between">
                <div>
                    <input
                        className='bg-gray-700 rounded-lg p-2 mb-3 '
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    {addButton && (
                        <button
                            className='bg-gray-700 rounded-lg p-2 mb-3 text-gray-400 ms-3 hover:scale-110 duration-300'
                            onClick={() => openModal('Add')}
                        >
                            Add Customer
                        </button>
                    )}
                </div>
            </div>
            <div className='relative  overflow-x-auto rounded-lg'>
                <div className=''>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                            <tr>
                                <th className='px-6 py-3' >Id</th>
                                {tableHeader.map((header) => (
                                    <th className='px-6 py-3' key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr className='border-b bg-gray-800 border-gray-700' key={index}>
                                    <td className='px-6 py-4 font-medium  whitespace-nowrap text-white'>{startingSerialNumber + index}</td>
                                    {tableHeader.map((header) => (
                                        <td className='px-6 py-4 font-medium  whitespace-nowrap text-white' key={header}>
                                            {header === 'edit' ? (
                                                <FaEdit className='cursor-pointer' onClick={() => handleEdit(index)} />
                                            ) : header === 'status' ? (
                                                <select
                                                    value={row[header]}
                                                    className='px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                >
                                                    <option value={row[header]}>{row[header]}</option>
                                                </select>
                                            ) : header === 'delete' ? (
                                                <MdDeleteSweep className='cursor-pointer' onClick={() => deleteCustomer(row.id)} size={25} />
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
                    {page.map((page_number) => (
                        <li className='p-2 ' key={page_number}><a onClick={() => setCurrentPage(page_number)}>{page_number}</a></li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <AddCustomerModel
                    closeCustomerModel={closeModal}
                    customerAction={mode === 'Add' ? addCustomer : editCustomer}
                    mode={mode}
                    customerData={editModeData}
                />
            )}
        </div>
    );
};

export default Table;
