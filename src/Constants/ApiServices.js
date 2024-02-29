// apiService.js
import axios from "axios";

const token =
  "Bearer 11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887";

const apiService = {
  getCustomersData: (id) => {
    const url = id
      ? `https://gorest.co.in/public/v2/users/${id}`
      : "https://gorest.co.in/public/v2/users";
    return axios.get(url, { headers: { Authorization: token } });
  },
  createCustomer: (customerData) => {
    return axios.post("https://gorest.co.in/public/v2/users", customerData, {
      headers: { Authorization: token },
    });
  },
  putCustomer: (id, customerData) => {
    return axios.put(
      `https://gorest.co.in/public/v2/users/${id}`,
      customerData,
      { headers: { Authorization: token } }
    );
  },
  deleteCustomer: (id) => {
    return axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
      headers: { Authorization: token },
    });
  },
};

export default apiService;
