import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Plus } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';

const Categories = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('categories');
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
        <div className="relative overflow-x-auto shadow-lg rounded-md p-2">
          <ButtonAdd />
          <table className="w-full text-xs xs:text-sm text-blue-800">
            <caption class="caption-bottom mt-4 text-gray-400">
              Total de {data.length} itens.
            </caption>
            <thead>
              <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-blue-200">
                <th>Categoria</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((dt, index) => (
                  <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
                    <td className='p-1'>{dt.name}</td>
                    <td className='p-1'><Link to={`/categories/${dt.id}`}><PenBox className='w-4 h-4 text-blue-400 hover:text-blue-300' /></Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      )}
    </>
  );
};

export default Categories;