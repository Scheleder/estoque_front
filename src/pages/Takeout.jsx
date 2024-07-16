import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api from '@/services/config';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { Check } from 'lucide-react';
import ErrorPage from "./ErrorPage";
import { useToast } from "@/components/ui/use-toast";

const userId = localStorage.userId ?? 1;
const localId = localStorage.localId ?? 1;

const types = [
  { id: 1, value: 'Ajuste de estoque', label: 'Ajuste de estoque' },
  { id: 2, value: 'Alterar endereço de estoque', label: 'Alterar endereço de estoque' },
  { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' },
  { id: 4, value: 'Entrada de Material', label: 'Entrada de Material' },
  { id: 5, value: 'Saída de Material', label: 'Saída de Material' },
  { id: 6, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
]

const Takeout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { control, register, handleSubmit, setValue } = useForm();
  const [items, setItems] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('');
  const [qtde, setQtde] = useState('');
  const [adress, setAdress] = useState('');
  const [type, setType] = useState(null);
  const styles = { menu: base => ({ ...base, marginTop: 0 }) };

  const getData = async () => {
    try {
      setIsProcessing(true);

      const [response1, response2] = await Promise.all([
        api.get('items'),
        api.get('locals')
      ]);

      const sortedItems = response1.data
        .map(item => ({
          value: item.id,
          label: `${item.adress} ░ ${item.Component.description} ░ ${item.Component.Brand.name}`,
          unity: item.Component.Unity.abrev,
          adress: item.adress,
          qtde: item.quantity
        }))
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

  useEffect(() => {
    setValue("userId", userId); // Setting the userId value using setValue
    setValue("localId", localId);
  }, [setValue]);

  const changeUnity = (option) => {
    setUnity(option.unity);
    setQtde(option.qtde);
    setAdress(option.adress);
    setValue("itemId", option.value);
    setValue("destination", option.adress)
  };

  const changeType = (option) => {
    setType(option);
    setValue("type", option.value);
  };

  const mySubmit = async (values) => {
    console.log('Form values:', values.adress);
    try {
      setIsProcessing(true);
      const response = await api.post('/movements', values);
      console.log('API response:', response);
      if (response.status === 201) {
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        });
        setTimeout(function () {
          navigate(0);
        }, 1500);
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        });
      }
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err.message || "Ocorreu um erro",
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
            <div className='grid grid-cols-3'>
              <div className='col-span-3 mt-2'>
                <label>Tipo de movimentação:</label>
              </div>
              <div className='flex col-span-3'>
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
                      onChange={(selected) => field.onChange(selected.value).then(changeType(selected))}
                    />
                  )}
                />
              </div>
              {type && (
                <>
                  <div className='col-span-3 mt-2'>
                    <label>Item:</label>
                  </div>
                  <div className='col-span-3'>
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
                    />
                  </div>
                </>
              )}
            </div>
            {type && (
              <form onSubmit={handleSubmit(mySubmit)}>
                <input type="hidden" {...register("userId", { required: true })} />
                {type.id === 1 && (
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
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 2 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='mt-2'>
                      <label>Endereço atual:</label>
                    </div>
                    <div className='relative mt-2'>
                      <label>Novo endereço:</label>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input className=" text-center" value={adress} readOnly /></div>
                    <div className='mr-4'><Input {...register("destination", { required: true })} placeholder="Novo endereço" type="text" defaultValue="" className="text-center" /></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 3 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade usada:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 4 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade adicionada:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 5 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade retirada:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div></div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
                {type.id === 6 && (
                  <div className='grid grid-cols-3 mb-2'>
                    <div className='relative mt-2'>
                      <label>Quantidade atual:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Quantidade transferida:</label>
                      <span className='absolute top-8 left-16 text-gray-500 text-sm'>{unity}</span>
                    </div>
                    <div className='relative mt-2'>
                      <label>Estoque destino:</label>
                    </div>
                    <div className='mr-4'><Input value={qtde} readOnly /></div>
                    <div className='mr-4'><Input {...register("quantity", { required: true })} type="number" min="0" max="999999" defaultValue={0}></Input></div>
                    <div className='mr-4'>
                      <Controller
                        name="localId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={locals}
                            placeholder="Estoque destino"
                            className='w-full'
                            styles={styles}
                            onChange={(option) => setValue("localId", option.value)}
                          />
                        )}
                      />
                    </div>
                    <div className='mr-2'><Button type="submit" className="w-full hover:bg-gray-500"><Check className='mr-2' />Confirmar</Button></div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Takeout;
