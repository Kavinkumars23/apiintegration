import axios from "axios";
import { token } from "../Constants/ApiServices";

const instance = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});

instance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response.status;
    switch (status) {
      case 400:
        console.log("Bad Request");
        break;
      case 401:
        console.log("Unauthorized");
        break;
      case 404:
        console.log("Not Found");
        break;
      case 500:
        console.log("Server Error");
        break;
      default:
        console.log("an unknown error occurred");
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;
