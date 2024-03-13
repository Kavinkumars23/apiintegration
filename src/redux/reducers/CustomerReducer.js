import { GetCustomer } from "../constants";

let initialvalue = {
  CustomerDataModel: [],
};

export const CustomerReducer = (value = initialvalue, action) => {
  console.log("CustomerReducer", action?.payload);
  switch (action?.type) {
    case GetCustomer.REQUEST:
      return { CustomerDataModel: action?.payload };
    case GetCustomer.SUCCESS:
      return { CustomerDataModel: action?.payload };
    case GetCustomer.ERROR:
      return { CustomerDataModel: action?.payload };
    default:
      return value;
  }
};
