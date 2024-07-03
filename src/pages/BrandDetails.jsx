import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import { Eye, Link as WWW, Save, Earth } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const BrandDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsProcessing(true);
      const response = await api.get(`brands/${id}`);
      setBrand(response.data.brand);
      console.log(response.data.brand);
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

  const handleContact = (web) => {
    console.log("Contato enviado!");
    return navigate(web);
  };

  return (
    <>
      {isProcessing ? (
        <div className="pl-16 pt-20">
          <Loading />
        </div>
      ) : error ? (
        <div className="error">Erro ao carregar os dados: {error.message}</div>
      ) : (
        <div className="pl-16 pt-20">
          <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <div className='grid grid-cols-3 mb-2'>
              <div className='col-span-2 mt-2'>
                <label>Fabricante:</label>
              </div>
              <div className='mt-2'>
                <label className='mt-2'>Data do cadastro:</label>
              </div>
              <div className='flex col-span-2'>
                <Input placeholder="Nome" className=" mr-4" value={brand.name} readOnly />
              </div>
              <div className='col-span-1'>
                <Input placeholder="Registro" className=" text-center" value={getDate(brand.createdAt)} readOnly />
              </div>
              <div className='col-span-3 mt-2 relative'>
                <label>Website:</label>
                <a href={brand.website} target="_blank" rel="noopener noreferrer" title="Visitar" className='absolute text-blue-500 hover:text-blue-400 top-9 left-2 cursor-pointer'><WWW className='w-4 h-4' /></a>
              </div>
              <div className='flex col-span-3'>
                <Input placeholder="Website" className=" pl-8" value={brand.website} /> 
                <Button className="ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-5 h-5 mr-2' /> Salvar alterações</Button>
              </div>
            </div>
          </div>

          <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Componentes do Fabricante {brand.name}</span>
            <table className="w-full text-xs xs:text-sm text-blue-900 mt-2">
              <caption className="caption-bottom mt-4 text-gray-400">
                Total de registros: {brand.Components.length}
              </caption>
              <thead>
                <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-blue-200">
                  <th>Categoria</th>
                  <th>SKU</th>
                  <th>Componente</th>
                  <th>Cadastrado em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  brand.Components.map((dt, index) => (
                    <tr key={index} className='odd:bg-stone-200 even:bg-stone-300 hover:bg-blue-100 font-semibold'>
                      <td className='p-1'>{dt.Category.name}</td>
                      <td className='p-1'>{dt.sku}</td>
                      <td className='p-1'>{dt.description}</td>
                      <td className='p-1'>{getDate(dt.createdAt)}</td>
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
  )
}

export default BrandDetails