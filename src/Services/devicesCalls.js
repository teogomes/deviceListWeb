import api from "./api";

// const baseURL = "https://pacific-harbor-74182.herokuapp.com/api/";
const baseURL = "http://localhost:3001/api/";

export const getDevices = () => {
  return api.getData(baseURL + "devices");
};

export const getDevice = (id) => {
  return api.getData(`${baseURL}devices/${id}`);
};

export const deleteDevice = (id) => {
  return api.deleteData(`${baseURL}devices/${id}`);
};

export const addDevice = (device) => {
  return api.postData(`${baseURL}devices`, device);
};

export const editDevice = (id, device) => {
  return api.putData(`${baseURL}devices/${id}`, device);
};
