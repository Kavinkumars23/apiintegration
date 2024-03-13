// apiService.js
import axios from "axios";
import instance from "../Global/interceptors";

export const token =
  "11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887";

const apiService = {
  getCustomersData: (id) => {
    const url = id ? `/users/${id}` : "/users";
    return instance.get(url);
  },
  createCustomer: (customerData) => {
    return instance.post("/users", customerData);
  },
  putCustomer: (id, customerData) => {
    return instance.put(`/users/${id}`, customerData);
  },
  deleteCustomer: (id) => {
    return instance.delete(`/users/${id}`);
  },
  login: (payload) => {
    return axios.post(
      `https://6da5-2405-201-e059-b805-e5d0-6c8c-c766-33be.ngrok-free.app/api/v1/login`,
      payload ,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
  },
};

export default apiService;