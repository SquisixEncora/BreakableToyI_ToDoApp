// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9090/api/todos', // Cambia la URL si es diferente
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
