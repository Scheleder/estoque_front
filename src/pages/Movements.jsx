import React, { useEffect, useState } from 'react';
import api from '@/services/config';
import { Eye } from "lucide-react"
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const getDate = (dt) => {
  return format(new Date(dt), 'dd/MM/yyyy - HH:mm');
}

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
      <h2>Movimentações de Estoque</h2>

      {isProcessing ? (
        <div className="loading">Carregando Dados...</div>
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (
        <div className="mt-4 relative overflow-x-auto shadow-lg rounded-md">
          <table className="w-full text-xs xs:text-sm text-blue-900">
            <thead>
              <tr className="text-xs h-6 text-white text-left uppercase bg-blue-900">
                <th>Data</th>
                <th>Tipo</th>
                <th>Destino</th>
                <th>Quantidade</th>
                <th>Item SKU</th>
                <th>Colaborador</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((dt, index) => (
                  <tr key={index} className='bg-gray-200 hover:bg-gray-300 font-semibold'>
                    <td className='p-1'>{getDate(dt.createdAt)}</td>
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
                    <td className='p-1'><Link to={`/moves/${dt.id}`}><Eye className='w-4 h-4 text-green-600' title='Visualizar' /></Link></td>
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

export default Movements;