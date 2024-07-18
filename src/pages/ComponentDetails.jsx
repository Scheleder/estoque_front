import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import ComponentInfo from '@/components/componentInfo';
import ErrorPage from "./ErrorPage"
import { useToast } from "@/components/ui/use-toast"
import { useForm, Controller } from "react-hook-form";
import { Eye, Send, Save, Earth } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const styles = { menu: base => ({ ...base, marginTop: 0 }) };

const ComponentDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { control, register, handleSubmit } = useForm();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setIsProcessing(true);

      const [response1, response2, response3] = await Promise.all([
        api.get(`components/${id}`),
        api.get('categories'),
        api.get('brands')
      ]);

      setComponent(response1.data.component);
      console.log(response1.data.component);

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

  const mySubmit = async (values) => {

    try {
      setIsProcessing(true);
      const response = await api.put(`components/${id}`, values);
      console.log(response.data.component);
      if (response.status === 200) {
        toast({
          title: "Atualizado!",
          description: response.data.msg,
        })
        getData();
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        })
      }
    } catch (err) {
      setError(err);
      console.log(err);
      toast({
        title: "Erro!",
        description: err,
      })
    } finally {
      setIsProcessing(false);
    }
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
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className='grid grid-cols-3 mb-2'>
                <div className='col-span-3 mt-2'>
                  <label>Categoria:</label>
                </div>
                <div className='flex col-span-3'>
                <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        value={ component.categoryId }
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected ? selected.value : null)}
                      />
                    )}
                  />
                </div>
                <div className='col-span-3 mt-2'>
                  <label>Fabricante:</label>
                </div>
                <div className='flex col-span-3'>
                  <Controller
                    name="brandId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={brands}
                        value={ component.brandId }
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => field.onChange(selected ? selected.value : null)}
                      />
                    )}
                  />
                </div>
                <div className='col-span-2 mt-2'>
                  <label>Componente:</label>
                </div>
                <div className='mt-2 pl-4'>
                  <label>Data do cadastro:</label>
                </div>
                <div className='flex col-span-2'>
                  <Input {...register("description", { required: true })} className="" defaultValue={component.description} />
                </div>
                <div className='col-span-1 pl-4'>
                  <Input placeholder="Registro" className=" text-center" value={getDate(component.createdAt)} readOnly />
                </div>
                <div className='col-span-1 mt-2'>
                  <label>SKU:</label>
                </div>
                <div className='col-span-1 mt-2 pl-2'>
                  <label>Código de barras:</label>
                </div>
                <div className='col-span-1 mt-2'></div>
                <div className='col-span-1'>
                  <Input {...register("sku", { required: true })} className=" mr-2" defaultValue={component.sku} />
                </div>
                <div className='col-span-1 pr-2'>
                  <Input {...register("barcode", { required: true })} className=" ml-2" defaultValue={component.barcode} />
                </div>
                <div className='flex col-span-1'>
                  <Button type="submit" className="w-full ml-4 bg-blue-700 hover:bg-blue-500"><Save className='w-5 h-5 mr-2' /> Salvar alterações</Button>
                </div>
              </div>
            </form>
          </div>

          <ComponentInfo comp={component.description} fab={component.Brand.name} />

        </div>
      )}
    </>
  )
}

export default ComponentDetails