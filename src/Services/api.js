import axios from 'axios';

export const instance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getData = async (url) => {
  return instance({
    url: url,
    method: 'GET',
  });
};

const postData = async (url, data) => {
  return instance({
    url: url,
    data,
    method: 'POST',
  });
};

const putData = async (url, data) => {
  return instance({
    url: url,
    data,
    method: 'PUT',
  });
};

const deleteData = async (url) => {
  return instance({
    url: url,
    method: 'DELETE',
  });
};

export default { getData, deleteData, postData, putData };
