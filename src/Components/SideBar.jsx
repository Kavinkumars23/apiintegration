import React, { useState } from 'react';

const SideBar = ({ tableDatas }) => {
  const [accordion, setAccordion] = useState(true);

  const handleShowAccordion = () => {
    setAccordion(!accordion);
  };
  
    const links = [
    { heading: "Name" },
    { heading: "Email" },
    { heading: "Gender" },
    { heading: "Status" },
    {
      heading: "Status Request",
      option: [
        "Approved",
        "Denied",
        "Pending",
        "Additional Details Added",
        "In Review",
      ],
    },
  ];


  return (
    <div className='hidden lg:flex flex-col h-full w-1/6 text-white bg-gradient-to-b from-gray-800 to-black fixed px-4 mt-20'>
           
    </div>
  );
};

export default SideBar;
