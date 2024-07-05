import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ButtonAdd from '@/components/buttonAdd'
import Loading from '@/components/loading';
import { Check, CircleCheck } from 'lucide-react';
import { CategoryAdd } from './CategoryAdd';
import { BrandAdd } from './BrandAdd';
import ErrorPage from "./ErrorPage"
import { ComponentAdd } from './ComponentAdd';


const Supply = (props) => {

  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [unity, setUnity] = useState('')
  const styles = { menu: base => ({ ...base, marginTop: 0 }) };

  const getData = async () => {
    try {
      setIsProcessing(true);
      const [response1, response2, response3] = await Promise.all([
        api.get('components'),
        api.get('categories'),
        api.get('brands')
      ]);

      const sortedComponents = response1.data
        .map(item => ({ value: item.id, label: item.description, unity: item.Unity.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setComponents(sortedComponents);

      const sortedCategories = response2.data
        .map(item => ({ value: item.id, label: item.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setCategories(sortedCategories);

      const sortedBrands = response3.data
        .map(item => ({ value: item.id, label: item.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setBrands(sortedBrands);

    } catch (err) {
      setError(err);
      console.error(err);
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
  }

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

              <div className='relative col-span-3 mt-2'>
                <label>Categoria:</label>
                <div className='absolute top-4 right-0'><CategoryAdd /></div>
              </div>
              <div className='flex col-span-3'>
                <Select options={categories} placeholder="Selecione a categoria" className='w-full mr-36' styles={styles} />                
              </div>
              <div className='relative flex col-span-3 mt-2'>
                <label>Fabricante:</label>
                <div className='absolute top-4 right-0'><BrandAdd /></div>
              </div>
              <div className='flex col-span-3'>
                <Select options={brands} placeholder="Selecione o fabricante" className='w-full mr-36' styles={styles} />
              </div>
              <div className='relative col-span-3 mt-2'>
                <label>Componente:</label>
                <div className='absolute top-4 right-0'><ComponentAdd /></div>
              </div>
              <div className='flex col-span-3'>
                <Select options={components} placeholder="Selecione o componente" className='w-full mr-36' styles={styles} onChange={changeUnity} />
              </div>
              <div className='col-span-1 mt-2'>
                <label>Endereço de estoque:</label>
              </div>
              <div className='col-span-1 mt-2 relative'>
                <label>Quantidade:</label>
                <span className='absolute top-8 left-32 text-gray-500 text-sm'>{unity}</span>
              </div>
              <div></div>
              <div className='mr-4'><Input placeholder="Endereço de estoque" className=" text-center"></Input></div>
              <div className='mr-4'><Input placeholder="0" type="number" min="0" max="999999999" className=""></Input></div>
              <div className='mr-2'><Button className="w-full hover:bg-gray-500"> <Check className='mr-2'/> Confirmar</Button></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Supply