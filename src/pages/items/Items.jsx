import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Boxes, ListFilter, RotateCcw, ArrowUpDown, EllipsisVertical, AlignHorizontalDistributeCenter as Piece, ShoppingCart, Filter, RefreshCw, Loader } from "lucide-react"
import { Link } from 'react-router-dom';
import Loading from '@/components/loading';
import ErrorPage from "../utils/ErrorPage"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getDefaultLocal } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"

const Items = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);
  const [searchAdress, setSearchAdress] = useState('');
  const [searchItem, setSearchItem] = useState('');
  let isFilterApplied = false;

  const local = getDefaultLocal();
  
  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('items', { params: { localId: local?.value } });
      var sorted = response.data.sort((a, b) => a.Component.description.localeCompare(b.Component.description));
      setData(sorted);
      setFilteredData(sorted);
    } catch (err) {
      setError(err);

    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterItems();
    isFilterApplied = searchAdress != '' || searchItem != '';
  }, [searchAdress, searchItem]);

  const orderByItem = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.Component.description.localeCompare(b.Component.description)
        : b.Component.description.localeCompare(a.Component.description)
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const orderByAdress = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return asc
        ? a.adress.localeCompare(b.adress)
        : b.adress.localeCompare(a.adress)
    });
    setFilteredData(sortedData);
    setAsc(!asc);
  };

  const filterItems = () => {
    const filteredItems = data.filter(a =>
      a.Component.description.toLowerCase().includes(searchItem.toLowerCase()) &&
      a.adress.toLowerCase().includes(searchAdress.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const clearSearchItem = () => {
    setSearchItem('')
    setFilteredData(data)
  }

  const clearSearchAdress = () => {
    setSearchAdress('')
    setFilteredData(data)
  }

  const clearFilters = () => {
    clearSearchAdress();
    clearSearchItem();
  }

  return (
    <div className="pl-16 pt-20">
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 bg-gray-200 md:hidden">
            <div className='flex text-gray-600 mb-4'>
              {isProcessing && (<span className='text-lime-600 flex items-center'><Loader className='animate-spin mr-2 h-4 w-4 font-bold' />Carregando...</span>)}
              {!searchAdress && !searchItem && !isProcessing && (
                <div id="openFilters" className='text-left w-40'>
                  <span className='font-semibold flex items-center'>
                    <Filter className='mr-2 h-4 w-4' />Filtrar
                  </span>
                </div>
              )}
              {(searchAdress || searchItem) && !isProcessing && (
                <div id="clearFilters" className='text-left w-80 hover:text-red-800 cursor-pointer'>
                  <span className='font-semibold flex items-center hover:animate-pulse' title='Clique para limpar todos os filtros' onClick={clearFilters}>
                    <RefreshCw className='mr-2 h-4 w-4 hover:animate-spin' />Limpar Filtros
                  </span>
                </div>
              )}
            </div>
            <div className='grid grid-cols-2 pb-2'>

              <div className='grid px-2'>
                <Label className="ml-2 uppercase text-gray-400 text-xs">Endereço</Label>
                <Input
                  type="text"
                  value={searchAdress}
                  onChange={(e) => setSearchAdress(e.target.value)}
                  className='w-full text-md'
                  placeholder='Filtrar...'
                />
              </div>
              <div className='grid px-2'>
                <Label className="ml-2 uppercase text-gray-400 text-xs">Item</Label>
                <Input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className='w-full text-md'
                  placeholder='Filtrar...'
                />
              </div>
            </div>
          </div>

          <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <div className='overflow-x-auto rounded-md shadow-md'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1">
                  {searchAdress || searchItem ?
                    <span className='text-orange-600'>Total de registros com filtro: {filteredData.length}</span> :
                    <span className='text-gray-500'>Total de registros: {filteredData.length}</span>
                  }
                </caption>
                <thead>
                  <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                    <th className=''>
                      <ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByAdress} />
                      <span className='ml-6'>Endereço</span>
                      <span className='relative max-md:hidden'>
                        <input
                          type="text"
                          value={searchAdress}
                          onChange={(e) => setSearchAdress(e.target.value)}
                          className='w-32 ml-2 pl-2 rounded-sm text-xs text-orange-600'
                          placeholder='Filtrar...'
                        />
                        {searchAdress ?
                          <RotateCcw size={12} className='absolute right-2 top-0.5 text-gray-600 hover:text-red-400 cursor-pointer' onClick={clearSearchAdress} /> :
                          <ListFilter size={12} className='absolute right-2 top-0.5 text-gray-600' />
                        }
                      </span>
                    </th>
                    <th className=''>
                      <ArrowUpDown size={12} className='mr-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByItem} />
                      <span className='ml-4'>Item</span>
                      <span className='relative max-md:hidden'>
                        <input
                          type="text"
                          value={searchItem}
                          onChange={(e) => setSearchItem(e.target.value)}
                          className='w-32 ml-2 pl-2 rounded-sm text-xs text-orange-600'
                          placeholder='Filtrar...'
                        />
                        {searchItem ?
                          <RotateCcw size={12} className='absolute right-2 top-0.5 text-gray-600 hover:text-red-400 cursor-pointer' onClick={clearSearchItem} /> :
                          <ListFilter size={12} className='absolute right-2 top-0.5 text-gray-600' />
                        }
                      </span>
                    </th>
                    <th>Quantidade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredData.map((dt, index) => (
                      <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                        <td className='px-2 py-1'>{dt.adress}</td>
                        <td className='p-1'>{dt.Component.description}</td>
                        <td className='p-1'>{dt.quantity} {dt.Component.Unity.abrev}</td>
                        <td className='flex p-1'>
                          <DropdownMenu className="z-0">
                            <DropdownMenuTrigger asChild>
                              <EllipsisVertical className='text-gray-500 cursor-pointer' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link to={`/takeout/${dt.id}`}>
                                  <span className="flex"><ShoppingCart className='w-4 h-4 mt-0.5 mr-2 text-gray-400' />
                                    Movimentar item
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link to={`/items/${dt.id}`}>
                                  <span className="flex"><Boxes className='w-4 h-4 mt-0.5 mr-2 text-gray-400' />
                                    Visualizar item
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex">
                                <Link to={`/components/${dt.componentId}`}>
                                  <span className="flex">
                                    <Piece className='w-4 h-4 mt-0.5 mr-2 text-gray-400' />
                                    Visualizar componente
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
