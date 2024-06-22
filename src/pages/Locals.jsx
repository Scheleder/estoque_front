import React, { useEffect, useState } from 'react';
import api from '@/services/config';

const Locals = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('locals');
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
    <div className="pl-16 pt-20">
      <h2>Locais</h2>
    
      {isProcessing ? (
        <div className="loading">Carregando Dados...</div>
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (
        <ul className="pl-2">
          {data.map((dt, index) => (
            <li key={index}>
              {dt.id} <br /> {dt.name} <br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Locals;