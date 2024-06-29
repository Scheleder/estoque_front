import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Select from 'react-select'
import { Input } from '@/components/ui/input'
import ButtonAdd from '@/components/buttonAdd'
import { Send, Save } from 'lucide-react';

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
        <div className="error">Erro ao carregar os dados: {error.message}</div>
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
                <Input placeholder="Nome" className="bg-white mr-4" value={user.name} readOnly />
              </div>
              <div className='col-span-1'>
                <Input placeholder="Registro" className="bg-white text-center" value={getDate(user.createdAt)} readOnly />
              </div>
              <div className='col-span-3 mt-2'>
                <label>E-mail:</label>
              </div>
              <div className='flex col-span-3'>
                <Input placeholder="E-mail" className="bg-white" value={user.email} />
                <Button onClick={handleContact} className="ml-4 bg-yellow-600 hover:bg-yellow-500"><Send className='w-5 h-5 mr-2' /> Enviar mensagem</Button>
                <Button className="ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-5 h-5 mr-2' /> Salvar alterações</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetails