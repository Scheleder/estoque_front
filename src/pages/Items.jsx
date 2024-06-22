import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import { Eye } from "lucide-react"
import { Link } from 'react-router-dom';

const Items = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('items');
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
      <h2>Itens de Estoque</h2>

      {isProcessing ? (
        <div className="loading">Carregando Dados...</div>
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (

        <div className="mt-4 relative overflow-x-auto shadow-lg rounded-md">
          <table className="w-full text-xs xs:text-sm text-blue-900">
            <tr className="text-xs h-6 text-white text-left uppercase bg-blue-900">
              <th>Endereço de Estoque</th>
              <th>Item</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
            <tbody>
              {
                data.map((dt, index) => (
                  <tr className='bg-gray-200 hover:bg-gray-300 font-semibold'>
                    <td className='p-1'>{dt.adress}</td>
                    <td className='p-1'>{dt.Component.description}</td>
                    <td className='p-1'>{dt.quantity} {dt.Component.Unity.abrev}</td>
                    <td className='p-1'><Link to={`/items/${dt.id}`}><Eye className='w-4 h-4 text-green-600' title='Visualizar'/></Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
      }
    </div>
  );
};

export default Items;