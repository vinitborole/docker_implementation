import axios from "axios";

const BASE_URL = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

const addTodo = async (data) => {
  return await axios.post(`${BASE_URL}/insert`, data, { headers });
};

const getTodo = async () => {
  return await axios.get(`${BASE_URL}/get`, { headers });
};

const updateTodo = (id, data) => {
  return axios.put(`${BASE_URL}/update/${id}`, data, { headers });
};

export { addTodo, getTodo, updateTodo };
