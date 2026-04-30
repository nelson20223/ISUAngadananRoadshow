import axios from "axios";

const API_BASE_URL = "https://kwikweb.live/api/products";

export const getProducts = () => {
  return axios.get(API_BASE_URL);
};

export const displayProducts = (params) => {
  return axios.get(`${API_BASE_URL}/display`, { params });
};

export const createProduct = (formData) => {
  return axios.post(API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProduct = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const updateProduct = (id, formData) => {
  return axios.post(`${API_BASE_URL}/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};