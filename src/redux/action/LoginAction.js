import axios from "axios";
import { Login } from "../constants";
import apiService from "../../Constants/ApiServices";

export const LoginAction = (payload) => async (dispatch) => {
  console.log("entered to login action");
  dispatch({
    type: Login.LOADING,
    payload: { loading: true },
  });
  try {
    const { data } = await apiService.login(payload);
    console.log(data);
    await dispatch({
      type: Login.SUCCESS,
      payload: { loading: false, data: data },
    });
  } catch (err) {
    await dispatch({
      type: Login.ERROR,
      payload: { loading: false, data: {} },
    });
  }
};
