import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ButtonAdd from '@/components/buttonAdd'
import Loading from '@/components/loading';

const Takeout = (props) => {

  const [items, setItems] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('')
  const [adress, setAdress] = useState('')
  const [qtde, setQtde] = useState('')
  const [type, setType] = useState('');
  const styles = { menu: base => ({ ...base, marginTop: 0 }) };

  const getData = async () => {
    try {
      setIsProcessing(true);

      const response = await api.get('items');
      const [response1, response2] = await Promise.all([
        api.get('items'),
        api.get('locals')
      ]);

      const sortedItems = response1.data
        .map(item => ({ value: item.id, label: item.adress + ' - ' + item.Component.description, unity: item.Component.Unity.name, adress: item.adress, qtde: item.quantity }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setItems(sortedItems);

      const sortedLocals = response2.data
      .map(item => ({ value: item.id, label: item.name }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setLocals(sortedLocals);

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

  const changeUnity = (option) => {
    console.log(option)
    setUnity(option.unity + 's')
    setAdress(option.adress)
    setQtde(option.qtde)
  }

  const changeType = (option) => {
    console.log(option)
    setType(option)
  }

  const types = [
    { id: 1, value: 'Ajuste de estoque', label: 'Ajuste de estoque' },
    { id: 2, value: 'Alterar endereço de estoque', label: 'Alterar endereço de estoque' },
    { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' },
    { id: 4, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
  ]

  const defaultType = { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' };

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
            <div className='grid grid-cols-3'>
              <div className='col-span-3 mt-1'>
                <label>Tipo de movimentação:</label>
              </div>
              <div className='flex col-span-3'>
                <Select options={types} defaultValue={defaultType} placeholder="Selecione o tipo de movimentação" className='w-full mt-2' styles={styles} onChange={changeType} />
              </div>
              <div className='col-span-3 mt-2'>
                <label>Item:</label>
              </div>
              <div className='flex col-span-3'>
                <Select options={items} placeholder="Selecione o item" className='w-full mt-2' styles={styles} onChange={changeUnity} />
              </div>
            </div>
            {type.id === 1 ? (
              <div className='grid grid-cols-3 mb-2'>
                <div className='mt-2'>
                  <label>Quantidade atual:</label>
                </div>
                <div className='relative mt-2'>
                  <label>Nova quantidade:</label>
                </div>
                <div></div>
                <div className='pr-8 mt-2'><Input placeholder="Quantidade atual" className="bg-white text-center" value={qtde} readOnly /></div>
                <div className='pr-8 mt-2'><Input placeholder="Nova quantidade" className="bg-white text-center" /></div>
                <div className='px-2 mt-2'><Button className="w-full hover:bg-gray-500">Confirmar</Button></div>
              </div>
            ) : type.id === 2 ? (
              <div className='grid grid-cols-3 mb-2'>
                <div className='mt-2'>
                  <label>Endereço atual:</label>
                </div>
                <div className='relative mt-2'>
                  <label>Novo endereço:</label>
                </div>
                <div></div>
                <div className='pr-8 mt-2'><Input placeholder="Endereço atual" className="bg-white text-center" value={adress} readOnly /></div>
                <div className='pr-8 mt-2'><Input placeholder="Novo endereço" className="bg-white text-center" /></div>
                <div className='px-2 mt-2'><Button className="w-full hover:bg-gray-500">Confirmar</Button></div>
              </div>
            ) : type.id === 3 ? (
              <div className='grid grid-cols-3 mb-2'>
                <div className='mt-2'>
                  <label>Número da ordem:</label>
                </div>
                <div className='relative mt-2'>
                  <label>Quantidade:</label><span className='absolute top-10 left-32 text-gray-500 text-sm'>{unity}</span>
                </div>
                <div></div>
                <div className='pr-8 mt-2'><Input placeholder="Número da ordem" className="bg-white text-center"></Input></div>
                <div className='pr-8 mt-2'><Input placeholder="0" type="number" min="0" max={qtde} className="bg-white"></Input></div>
                <div className='px-2 mt-2'><Button className="w-full hover:bg-gray-500">Confirmar</Button></div>
              </div>
            ) : (
              <div className='grid grid-cols-3 mb-2'>
                <div className='col-span-3 mt-2'>
                  <label>Estoque de destino:</label>
                </div>
                <div className='col-span-3 mt-2'>
                  <Select options={locals} placeholder="Selecione o estoque de destino" className='w-full' styles={styles} />
                </div>
                <div className='mt-2'>
                  <label>Endereço de destino:</label>
                </div>
                <div className='relative mt-2'>
                  <label>Quantidade a transferir:</label><span className='absolute top-10 left-32 text-gray-500 text-sm'>{unity}</span>
                </div>
                <div></div>
                <div className='pr-8 mt-2'><Input placeholder="Endereço destino" className="bg-white text-center" /></div>
                <div className='pr-8 mt-2'><Input placeholder="0" type="number" min="0" max={qtde} className="bg-white"></Input></div>
                <div className='px-2 mt-2'><Button className="w-full hover:bg-gray-500">Confirmar</Button></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Takeout