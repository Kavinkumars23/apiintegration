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
};

export default apiService;
