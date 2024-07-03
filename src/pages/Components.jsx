import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Eye } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';
import { ComponentAdd } from './ComponentAdd';
import ErrorPage from "./ErrorPage"

const Components = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('components');
      response.data.sort((a, b) => a.description.localeCompare(b.description));
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
        <ErrorPage error={error} />) : (
        <div className="relative overflow-x-auto shadow-lg rounded-md p-2">
          <ComponentAdd className="float-right"/>
          <div className='overflow-x-auto rounded-md shadow-md'>
            <table className="w-full text-xs xs:text-sm text-blue-900">
              <caption className="caption-bottom mt-4 text-gray-400">
                Total de registros: {data.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-blue-200">
                  <th className='pl-2'>Categoria</th>
                  <th>Fabricante</th>
                  <th>SKU</th>
                  <th>Descrição</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2 py-1'>{dt.Category.name}</td>
                      <td className='p-1'>{dt.Brand.name}</td>
                      <td className='p-1'>{dt.sku}</td>
                      <td className='p-1'>{dt.description}</td>
                      <td className='p-1'>
                        <Link to={`/components/${dt.id}`}><Eye className='w-4 h-4 text-green-800 hover:text-green-500' /></Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Components;