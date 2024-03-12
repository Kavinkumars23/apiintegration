import axios from "axios";
import { Login } from "../constants";

export const LoginAction = (payload) => async (dispatch) => {
  dispatch({
    type: Login.LOADING,
    payload: { loading: true },
  });
  try {
    const { data } = await axios.post(
      `https://9948-2405-201-e059-b805-9981-dba0-fbb4-a005.ngrok-free.app/api/v1/login`,
      payload
    );
    console.log(data);
    await dispatch({
      type: Login.SUCCESS,
      payload: { loading: false, data: data },
    });
    // window.location.href = "/dashboard";
  } catch (err) {
    await dispatch({
      type: Login.ERROR,
      payload: { loading: false, data: {} },
    });
  }
};
