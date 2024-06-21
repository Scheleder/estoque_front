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

const Users = (props) => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);


  const getUsers = async () => {
    try {
      await api.get()
        .then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        .catch((err) => {
          setError(err);
          console.log(error)
        })
        .finally(() => {
          setIsProcessing(false);
        })
    } catch (error) {
      return (<p>{error}</p>)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);



  return (

    <div className="pl-16 pt-20">
      <h2>
        Users
      </h2>        
        <ul className='pl-2'>
          {data.map((dt, index) => (
            <li key={index}>{dt.id} <br /> {dt.name} <br /> {dt.email}<br /><br /></li>
          ))}
        </ul>
  
    </div>

  )
}

export default Users