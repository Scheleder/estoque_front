import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import ErrorPage from "./ErrorPage"

const Users = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('users');
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
        <ErrorPage error={error} />
      ) : data.length === 0 ? (
        <div className="zeroItems">Não há items.</div>
      ) : (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
          {data.map((dt, index) => (
            <li key={index} className='w-80 grid grid-cols-3 shadow-lg rounded-md bg-indigo-100 p-2'>
              <div className='col-span-1 h-24'>
                <Link to={`/users/${dt.id}`}>
                  <img src="src/assets/usuario.png" alt="user" width={80} height={80} className='rounded-full border-2 hover:border-blue-300 border-white origin-center hover:-rotate-45' />
                </Link>
              </div>
              <div className='col-span-2'>
                <div className='h-8 flex items-end'><span className='text-blue-400 font-semibold'>{dt.name}</span></div>
                    <a href={`mailto:${dt.email}`} target="_blank" rel="noopener noreferrer">
                      <span className='text-gray-500 hover:text-orange-300 text-xs italic'>{dt.email}</span>
                    </a>
                    {dt.admin ? <p className='text-yellow-600 text-xs font-bold'>Administrador do sistema</p> : ''}
              </div>
              <div className='col-span-3 h-6 text-center'><span className='text-gray-400 text-xs'>Movimentações de estoque nos ultimos 30 dias: {dt.Movements.length}</span></div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
