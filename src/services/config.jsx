import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODU4MjYyfQ.ZkFHaoiYCTX52O2OL9UYJNRX8M0-izD7OtULQEr6rx4';

const api = axios.create({
  baseURL: 'http://100.29.104.33/',
});

// Adiciona um interceptor que será executado antes de cada requisição
api.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  export default api