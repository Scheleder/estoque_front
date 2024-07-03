import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import Loading from '@/components/loading';
import { Eye, CloudDownload } from "lucide-react"
import { Link } from 'react-router-dom';
import { getDate } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "./ErrorPage"
import ButtonExport from '@/components/buttonExport';

const Movements = () => {
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get('movements');
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
        <ErrorPage error={error} />
      ) : (
        <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 pb-0 bg-gray-200">
          <div className='overflow-x-auto rounded-md shadow-md'>
            <table className="w-full text-xs xs:text-sm text-blue-900">
              <caption className="caption-bottom mt-4 text-gray-400">
                Total de registros: {data.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                  <th className='pl-2'>Data</th>
                  <th>Tipo</th>
                  <th>Destino</th>
                  <th>Quantidade</th>
                  <th>Item SKU</th>
                  <th>Colaborador</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
                      <td className='px-2 py-1'>{getDate(dt.createdAt)}</td>
                      <td className='p-1'>{dt.type}</td>
                      <td className='p-1'>{dt.destination}</td>
                      <td className='p-1'>{dt.quantity} {dt.Item.Component.Unity.abrev}</td>
                      <td className='p-1'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link to={`/items/${dt.Item.id}`}>
                                <span>{dt.Item.Component.sku}</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-white">{dt.Item.Component.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className='p-1'>{dt.User.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <ButtonExport />
        </div>
      )
      }
    </div>
  );
};

export default Movements;