import React, { useEffect, useState } from 'react';
import api from '@/services/config';

const Users = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('users');
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="pl-16 pt-20">
      <h2>Users</h2>
    
      {isProcessing ? (
        <div className="loading">Carregando Dados...</div>
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (
        <ul className="pl-2">
          {data.map((dt, index) => (
            <li key={index}>
              {dt.id} <br /> {dt.name} <br /> {dt.email} <br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
