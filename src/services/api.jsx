import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get('token') || null;

  if (!token) {
    return null;
  }

  return 'Bearer ' + token;
};

const api = axios.create({
  //baseURL: 'https://100.29.104.33/'
  baseURL: 'https://estoque-facil.com/api'
});

api.interceptors.request.use(
  config => {    
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
      config.headers.Accept = '*/*';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Hook customizado para adicionar o redirecionamento
const useApiInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export { api, useApiInterceptor };
