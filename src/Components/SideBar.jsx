import React, { useState,useContext } from "react";
import { accordionData } from "../Constants/SideBarAccordianDatas.js";
import { useNavigate } from "react-router";
import { UserContext } from "../App.js";
const SideBar = () => {
  const tableDatas = useContext(UserContext);
  const findIdByName = (name, field) => {
    const selectedData = tableDatas.find(
      (data) => data[field === "name" ? "name" : "email"] === name
    );
    return selectedData && selectedData.id ;
  };

  const navigate = useNavigate();

  function handleRowClick(id) {
    navigate(`/Customer/${id}`);
  }
  const [selectedRadio, setSelectedRadio] = useState({});

  const handleRadioChange = (field, value) => {
    const id = findIdByName(value, field);
    handleRowClick(id);
    setSelectedRadio((prev) => ({ ...prev, [field]: value }));
  };

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="hidden lg:flex flex-col h-full w-1/6 text-white bg-gradient-to-b from-gray-800 to-black fixed px-4 mt-20">
      {accordionData &&
        Array.isArray(accordionData) &&
        accordionData.map((item, index) => (
          <div className="relative mb-3" key={index}>
            <h6 className="mb-0">
              <button
                className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-white rounded-t-1 group text-dark-500 ${
                  openAccordion === index ? "group-open" : ""
                }`}
                onClick={() => handleAccordionToggle(index)}
              >
                <span>{item.title}</span>
              </button>
            </h6>
            <div
              className={`${
                openAccordion === index ? "h-auto" : "h-0"
              } overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <div className="p-4 text-sm leading-normal text-white">
                {tableDatas &&
                  Array.isArray(tableDatas) &&
                  tableDatas.map((data, dataIndex) => (
                    <div key={dataIndex}>
                      <input
                        type="radio"
                        value={item.title === "Name" ? data.name : data.email}
                        checked={
                          selectedRadio[
                            item.title === "Name" ? "name" : "email"
                          ] === (item.title === "Name" ? data.name : data.email)
                        }
                        onChange={(e) =>
                          handleRadioChange(
                            item.title === "Name" ? "name" : "email",
                            e.target.value
                          )
                        }
                      />
                      <label>
                        {item.title === "Name" ? data.name : data.email}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SideBar;
