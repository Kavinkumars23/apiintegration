import React from "react";

const Button = ({ buttonName, buttonAction, buttonType, buttonStyle }) => {
  return (
    <button
      type={buttonType}
      className={buttonStyle}
      onClick={buttonAction} // Removed the unnecessary function call
    >
      {buttonName}
    </button>
  );
};

export default Button;
