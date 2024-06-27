import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import Loading from '@/components/loading';

const Brands = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('brands');
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
      {isProcessing ? (
        <Loading />
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

export default Brands;