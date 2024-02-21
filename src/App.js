import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import './index.css';
const UserContext = createContext()

function App() {
    const [tableRows, setTableRows] = useState([]);
    const [filters, setFilterData] = useState({
        name: [],
        email: []
    });
    console.log(filters);
    useEffect(() => {
        const getCustomersData = () => {
            axios
                .get("https://gorest.co.in/public/v2/users", {
                    headers: {
                        Authorization: `Bearer 11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887`,
                    }
                })
                .then(data => {
                    // console.log(data.data)
                    setTableRows(data.data)
                })
                .catch(error => console.log(error));
        };
        getCustomersData();
    }, []);

    return (
        <>
            <NavBar />
            <div className='flex'>
                <div className="w-1/6">
                    <SideBar tableDatas={tableRows} setFilter={setFilterData} />
                </div>
                <div className="lg:w-5/6 w-full md:mt-0 mt-20">
                    <UserContext.Provider value={filters}>
                        <Outlet />
                    </UserContext.Provider>
                </div>
            </div>
        </>
    );
}

export { UserContext, App as default };
