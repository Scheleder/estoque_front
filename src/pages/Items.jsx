import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import { Eye, Search, Boxes, Filter, BaggageClaim, ArrowUpDown, EllipsisVertical, AlignHorizontalDistributeCenter as Piece } from "lucide-react"
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import ErrorPage from "./ErrorPage"
import FilterList from '@/components/filterList';
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
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(false);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('items');
      var sorted = response.data.sort((a, b) => a.Component.description.localeCompare(b.Component.description));
      setData(sorted);
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

  const orderByItem = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.Component.description.localeCompare(b.Component.description)
        : b.Component.description.localeCompare(a.Component.description)
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByAdress = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.adress.localeCompare(b.adress)
        : b.adress.localeCompare(a.adress)
    });
    setData(sortedData);
    setAsc(!asc);
  };

  return (
    <div className="pl-16 pt-20">
      {/* <div className="relative">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-zinc-600" />
        <Input
          type="search"
          placeholder="Procurar..."
          className="w-full mt-3 rounded-lg  mb-2 px-8 md:w-[150px] lg:w-[200px] text-center text-zinc-600"
        />
      </div> */}

      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (

        <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 bg-gray-200">
          <div className='overflow-x-auto rounded-md shadow-md'>
            <table className="w-full text-xs xs:text-sm text-blue-900">
              <caption className="caption-bottom mt-2 text-gray-400">
                Total de registros: {data.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                  <th className=''><ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByAdress} />
                    <span className='ml-6'>Endereço</span><FilterList /></th>
                  <th className=''><ArrowUpDown size={12} className='mr-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByItem} />
                    <span className='ml-4'>Item</span><FilterList /></th>
                  <th>Quantidade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-300 even:bg-stone-200 hover:bg-blue-100 font-semibold'>
                      <td className='px-2 py-1'>{dt.adress}</td>
                      <td className='p-1'>{dt.Component.description}</td>
                      <td className='p-1'>{dt.quantity} {dt.Component.Unity.abrev}</td>
                      <td className='flex p-1'>
                        <DropdownMenu className="z-0">
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className='text-gray-500 cursor-pointer'/>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
      )
      }
    </div>
  );
};

export default Items;