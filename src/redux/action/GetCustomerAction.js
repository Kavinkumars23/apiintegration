import apiService from "../../Constants/ApiServices";
import { GetCustomer } from "../constants";

export const GetCustomerAction = (id) => async (dispatch) => {
  console.log("GetCustomerAction");
  dispatch({
    type: GetCustomer.LOADING,
    payload: { loading: true },
  });
  try {
    const { data } = await apiService.getCustomersData(id);
    console.log(data, "from customer Action");
    await dispatch({
      type: GetCustomer.SUCCESS,
      payload: { loading: false, data: data },
    });
  } catch (err) {
    await dispatch({
      type: GetCustomer.ERROR,
      payload: { loading: false, data: {} },
    });
  }
};
