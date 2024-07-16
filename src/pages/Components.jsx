import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/config';
import Loading from '@/components/loading';
import { PenBox, Eye, ArrowUpDown } from "lucide-react"
import ButtonAdd from '@/components/buttonAdd';
import { ComponentAdd } from './ComponentAdd';
import ErrorPage from "./ErrorPage"
import FilterList from '@/components/filterList';

const Components = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);

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

  const orderByBrand = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
      ? a.Brand.name.localeCompare(b.Brand.name)
      : b.Brand.name.localeCompare(a.Brand.name);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByDescription = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
      ? a.description.localeCompare(b.description)
      : b.description.localeCompare(a.description);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderBySku = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
      ? a.sku.localeCompare(b.sku)
      : b.sku.localeCompare(a.sku);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByCategory = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
      ? a.Category.name.localeCompare(b.Category.name)
      : b.Category.name.localeCompare(a.Category.name);
    });
    setData(sortedData);
    setAsc(!asc);
  };
  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />) : (
        <div className="relative overflow-x-auto shadow-lg rounded-md">
          <div className='overflow-x-auto rounded-md shadow-md m-2'>
            <table className="w-full text-xs xs:text-sm text-blue-900">
              <caption className="caption-bottom text-gray-500 mt-2">
                Total de registros: {data.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                  <th className=''><ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByCategory}/>
                  <span className='ml-6'>Categoria</span><FilterList /></th>
                  <th className=''><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByBrand}/>
                  <span className='ml-4'>Fabricante</span><FilterList /></th>
                  <th className=''><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDescription}/>
                  <span className='ml-4'>Descrição</span><FilterList /></th>
                  <th className=''><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderBySku}/>
                  <span className='ml-4'>SKU</span><FilterList /></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2 py-1'>{dt.Category.name}</td>
                      <td className='p-1'>{dt.Brand.name}</td>
                      <td className='p-1'>{dt.description}</td>
                      <td className='p-1'>{dt.sku}</td>
                      <td className='p-1'>
                        <Link to={`/components/${dt.id}`}><Eye className='w-4 h-4 text-green-800 hover:text-green-500' /></Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <ComponentAdd />
        </div>
      )}
    </>
  );
};

export default Components;