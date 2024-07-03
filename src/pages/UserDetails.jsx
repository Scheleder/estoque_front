import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import { Link as WWW, Send, Save } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "./ErrorPage"

const UserDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get(`users/${id}`);
      setUser(response.data.user);
      console.log(response.data.user);
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

  const handleContact = () => {
    console.log("Contato enviado!");
    return navigate("/");
  };

  return (
    <>
      {isProcessing ? (
        <div className="pl-16 pt-20">
          <Loading />
        </div>
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <div className="pl-16 pt-20">
          <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <div className='grid grid-cols-3 mb-2'>
              <div className='col-span-2 mt-2'>
                <label>Nome:</label>
              </div>
              <div className='mt-2'>
                <label className='mt-2'>Data do cadastro:</label>
              </div>
              <div className='flex col-span-2'>
                <Input placeholder="Nome" className=" mr-4" value={user.name} readOnly />
              </div>
              <div className='col-span-1'>
                <Input placeholder="Registro" className=" text-center" value={getDate(user.createdAt)} readOnly />
              </div>
              <div className='col-span-3 mt-2'>
                <label>E-mail:</label>
              </div>
              <div className='flex col-span-3 relative'>
              <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer" title="Enviar e-mail" className='absolute text-blue-500 hover:text-blue-400 top-3 left-2 cursor-pointer'><Send className='w-4 h-4' /></a>
                <Input placeholder="E-mail" className=" pl-8" value={user.email} />
                <Button className="ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-5 h-5 mr-2' /> Salvar alterações</Button>
              </div>
            </div>
          </div>

          <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Movimentações de {user.name}</span>
            <table className="w-full text-xs xs:text-sm text-blue-900 mt-2">
              <caption className="caption-bottom mt-4 text-gray-400">
                Total de registros: {user.Movements.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-blue-200">
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Destino</th>
                  <th>Quantidade</th>
                  <th>Item SKU</th>
                  <th>Colaborador</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.Movements.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
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
                      <td className='p-1'>{user.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetails