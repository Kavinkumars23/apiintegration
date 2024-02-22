import axios from "axios";
const getCustomersData = () => {
  axios
      .get("https://gorest.co.in/public/v2/users", {
          headers: {
              Authorization: `Bearer 11e65734a957e3ef5064f1bb8844161d1737afaadd5a46773af5ff8072435887`,
          }
      })
      .then(data => {
          
      })
      .catch(error => console.log(error));
};
const tableDatas = getCustomersData.data;
export const accordionData = [
    {
      title: 'Name',
      content: ''
      ,
    },
    {
      title: 'Email',
      content: '',
    },
    
  ];