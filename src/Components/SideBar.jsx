import React, { useState } from 'react';
import { accordionData } from '../Constants/SideBarAccordianDatas.js';

const SideBar = ({ tableDatas, handleSelectedRow }) => {
  const findIdByName = (name) => {
    const selectedData = tableDatas.find((data) => data.name === name);
    return selectedData ? selectedData.id : null;
  };

  const handleCheckboxChange = (field, value) => {
    const id = findIdByName(value);

    handleSelectedRow(id);
  };

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="hidden lg:flex flex-col h-full w-1/6 text-white bg-gradient-to-b from-gray-800 to-black fixed px-4 mt-20">
      {accordionData.map((item, index) => (
        <div className="relative mb-3" key={index}>
          <h6 className="mb-0">
            <button
              className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-white rounded-t-1 group text-dark-500 ${
                openAccordion === index ? "group-open" : ""
              }`}
              onClick={() => handleAccordionToggle(index)}
            >
              <span>{item.title}</span>
              <i className="absolute right-0 pt-1 text-xs fa fa-plus group-open:opacity-0"></i>
              <i className="absolute right-0 pt-1 text-xs opacity-0 fa fa-minus group-open:opacity-100"></i>
            </button>
          </h6>
          <div
            className={`${
              openAccordion === index ? "h-auto" : "h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="p-4 text-sm leading-normal text-white">
              {tableDatas.map((data, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`nameCheckbox${index}`}
                    value={data.name}
                    onChange={(e) =>
                      handleCheckboxChange("name", e.target.value)
                    }
                  />
                  <label htmlFor={`nameCheckbox${index}`}>
                    {data.name }
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
