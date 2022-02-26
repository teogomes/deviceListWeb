import api from './api';

// const baseURL = "https://pacific-harbor-74182.herokuapp.com/api/";
const baseURL = 'http://localhost:3001/';

export const login = (data) => {
  return api.postData(baseURL + 'login', data);
};
