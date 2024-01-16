import axios from 'axios';

const apiClient = axios.create({
  // baseURL: '10.232.83.117:5000/',
  baseURL: 'http://10.232.83.117:5000/',
});
export default apiClient;
