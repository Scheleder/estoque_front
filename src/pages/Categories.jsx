import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Plus, ArrowUpDown } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';
import { CategoryAdd } from './CategoryAdd';
import FilterList from '@/components/filterList';

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
        <ErrorPage error={error} />
      ) : (
        <div className="relative overflow-x-auto shadow-lg rounded-md p-4 pb-0">
          <div className='overflow-x-auto rounded-md shadow-md'>
            <table className="w-full text-xs xs:text-sm text-blue-800">
              <caption className="caption-bottom mt-4 text-gray-400">
                Total de {data.length} itens.
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                <th className=''><ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' /><span className='ml-6'>Categories</span><FilterList /></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2'>{dt.name}</td>
                      <td className='p-1'><Link to={`/categories/${dt.id}`}><PenBox className='w-4 h-4 text-blue-400 hover:text-blue-300' /></Link></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <CategoryAdd />
        </div>
      )}
    </>
  );
};

export default Categories;