import axios from 'axios';

const apiClient = axios.create({
  // baseURL: '10.232.86.144:5000/',
  baseURL: 'http://192.168.137.199:5000/',
});
export default apiClient;
