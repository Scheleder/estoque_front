import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import ButtonAdd from '@/components/buttonAdd';

const Brands = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('brands');
      response.data.sort((a, b) => a.name.localeCompare(b.name));
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
      ) : (
        <div>
          <ButtonAdd />
          <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4">
            {data.map((dt, index) => (
              <li key={index} className='w-80 grid grid-cols-3 shadow-lg rounded-md my-4 bg-indigo-100 p-2'>
                <div className=''>
                  <Link to={`/brands/${dt.id}`}>
                    <img src="src/assets/brand.png" alt="user" width={80} height={80} className='rounded-full border-2 border-white hover:border-blue-300 origin-center hover:rotate-45' />
                  </Link>
                </div>
                <div className='col-span-2'>
                  <div className='h-12 flex items-end'><span className='text-blue-400 font-semibold'>{dt.name}</span></div>
                  <div className='h-12 flex items-start'>
                    <a href={dt.website} target="_blank" rel="noopener noreferrer">
                      <span className='text-orange-400 hover:text-orange-300 text-xs italic'>{dt.website}</span>
                    </a>
                  </div>
                </div>
                <div className='col-span-3 h-6 text-center'><span className='text-gray-400 text-xs'>Componentes cadastrados no sistema: {dt.Components.length}</span></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Brands;