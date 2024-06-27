import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import Loading from '@/components/loading';

const Users = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
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
    getData();
  }, []);

  return (
    <>
    
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : data.length === 0 ? (
        <div className="zeroItems">Não há items.</div>
      ) :(
        <ul className="p-4">
          {data.map((dt, index) => (
            <li key={index} className='flex shadow-lg rounded-md my-4 bg-orange-100 p-2'>  
              <div><img src="https://www.placeholder.com/80" alt="photo" className='rounded-full' /></div><div>{dt.name}</div><div>{dt.name}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
