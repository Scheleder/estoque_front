import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router';
import api from '@/services/config';
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ButtonAdd from '@/components/buttonAdd'
import Loading from '@/components/loading';
import { Check } from 'lucide-react';
import ErrorPage from "./ErrorPage"
import { useToast } from "@/components/ui/use-toast"

const Takeout = (props) => {

  const { toast } = useToast()
  const navigate = useNavigate()
  const { control, register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const [items, setItems] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('')
  const [adress, setAdress] = useState('')
  const [qtde, setQtde] = useState('')
  const [type, setType] = useState(0);
  const styles = { menu: base => ({ ...base, marginTop: 0 }) };

  const getData = async () => {
    try {
      setIsProcessing(true);

      const [response1, response2] = await Promise.all([
        api.get('items'),
        api.get('locals')
      ]);

      const sortedItems = response1.data
        .map(item => ({ value: item.id, label: item.adress + ' - ' + item.Component.description, unity: item.Component.Unity.abrev, adress: item.adress, qtde: item.quantity }))
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
    setUnity(option.unity)
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
    { id: 4, value: 'Entrada de Material', label: 'Entrada de Material' },
    { id: 5, value: 'Saída de Material', label: 'Saída de Material' },
    { id: 6, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
  ]

  const mySubmit = async (values) => {
    console.log(values);
    try {
      setIsProcessing(true);
      const response = await api.post('/movements', values);
      console.log(response);
      if (response.status === 201) {
        setData(response.data.movement);
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        });
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        });
      }
      setTimeout(function () {
        navigate(0);
      }, 1500);
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err,
      });
    } finally {
      setIsProcessing(false);
    }
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
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className='grid grid-cols-3'>
                <div className='col-span-3 mt-2'>
                  <label>Tipo de movimentação:</label>
                </div>
                <div className='flex col-span-3'>
                  {/* <Select options={types} placeholder="Selecione o tipo de movimentação" className='w-full' styles={styles} onChange={changeType} /> */}
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={types.find(option => option.value === field.value)}
                        options={types}
                        placeholder="Selecione o tipo de movimentação"
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected.value).then(setType(selected))}
                      />
                    )}
                  />
                </div>
                <div className='col-span-3 mt-2'>
                  {!type ? <div></div> : <label>Item:</label>}
                </div>
                <div className='col-span-3'>
                  {!type ? <div></div> :
                    // <Select options={items} placeholder="Selecione o item" className='w-full' styles={styles} onChange={changeUnity} />}
                  <Controller
                    name="itemId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={items.find(option => option.value === field.value)}
                        options={items}
                        placeholder="Selecione o item"
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected.value).then(changeUnity(selected))}
                      />
                    )}
                  />}
                </div>
              </div>
              {type.id === 1 ? (
                <div className='grid grid-cols-3 mb-2'>
                  <div className='relative mt-2'>
                    <label>Quantidade atual:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div className='relative mt-2'>
                    <label>Nova quantidade:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div></div>
                  <div className='mr-4'><Input className="" value={qtde} readOnly /></div>
                  <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max={qtde} value={0}></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
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
                  <div className='mr-4'><Input placeholder="Endereço atual" className=" text-center" value={adress} readOnly /></div>
                  <div className='mr-4'><Input {...register("adress", { required: true })} placeholder="Novo endereço" type="text" className="tetx-center"></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                </div>
              ) : type.id === 3 ? (
                <div className='grid grid-cols-3 mb-2'>
                  <div className='mt-2'>
                    <label>Número da ordem:</label>
                  </div>
                  <div className='relative mt-2'>
                    <label>Quantidade:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div></div>
                  <div className='mr-4'><Input {...register("adress", { required: true })} placeholder="Número da ordem" type="text" className="tetx-center"></Input></div>
                  <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max={qtde} value={0}></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                </div>
              ) : type.id === 4 ? (
                <div className='grid grid-cols-3 mb-2'>
                  <div className='relative mt-2'>
                    <label>Quantidade atual:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div className='relative mt-2'>
                    <label>Quantidade a adicionar:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div></div>
                  <div className='mr-4'><Input placeholder="Quantidade atual" value={qtde}></Input></div>
                  <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" value={0}></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                </div>
              ) : type.id === 5 ? (
                <div className='grid grid-cols-3 mb-2'>
                  <div className='relative mt-2'>
                    <label>Quantidade atual:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div className='relative mt-2'>
                    <label>Quantidade a retirar:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div></div>
                  <div className='mr-4'><Input placeholder="Quantidade atual" value={qtde}></Input></div>
                  <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max={qtde} value={0}></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                </div>
              ) : type.id === 6 ? (
                <div className='grid grid-cols-3 mb-2'>
                  <div className='col-span-3 mt-2'>
                    <label>Estoque de destino:</label>
                  </div>
                  <div className='col-span-3'>
                    {/* <Select options={locals} placeholder="Selecione o estoque de destino" className='w-full' styles={styles} /> */}
                    <Controller
                    name="localId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={locals.find(option => option.value === field.value)}
                        options={locals}
                        placeholder="Selecione o estoque de destino"
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected.value)}
                      />
                    )}
                  />
                  </div>
                  <div className='mt-2'>
                    <label>Endereço de destino:</label>
                  </div>
                  <div className='relative mt-2'>
                    <label>Quantidade a transferir:</label>
                    <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                  </div>
                  <div></div>
                  <div className='mr-4'><Input {...register("adress", { required: true })} placeholder="Novo endereço" type="text" className="tetx-center"></Input></div>
                  <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max={qtde} value={0}></Input></div>
                  <div className='mr-2'><Button className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                </div>
              ) : (<div className=''></div>)}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Takeout