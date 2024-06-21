import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODU4MjYyfQ.ZkFHaoiYCTX52O2OL9UYJNRX8M0-izD7OtULQEr6rx4';

const api = axios.create({
  baseURL: 'https://estoque.scheleder.com/users',
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

export const getAll = async (endpoint) => {
    const [data, setData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(endpoint)
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsProcessing(false);
            })
    }, []);

    return { data, isProcessing, error };
}

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//       }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//     });
    
//     // Add a response interceptor
//     axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//     }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//     });
// router.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//      });
