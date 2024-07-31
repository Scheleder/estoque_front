"use client"
import { useEffect, useState } from 'react';
import { format } from "date-fns"
import { useForm, Controller } from "react-hook-form";
import { ptBR, ru } from 'date-fns/locale';
import { api } from '@/services/api';
import Loading from '@/components/loading';
import { Trash, RefreshCw, ArrowUpDown, Filter, FilterX, ChevronDown, ChevronUp, CalendarIcon } from "lucide-react"
import { Link } from 'react-router-dom';
import { getDate, getEndDate } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ErrorPage from "../utils/ErrorPage"
import ButtonExport from '@/components/buttonExport';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Movements = () => {
  const { control, register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(true);

  const [filter, setFilter] = useState({
    dataIni: '',
    dataFim: '',
    type: '',
    destination: '',
    localId: '',
    itemId: '',
    userId: '',
  })

  const styles = {
    menu: base => ({
      ...base,
      marginTop: '0.3rem',
      zIndex: 999
    }),
  };

  const types = [
    { id: 1, value: 'Ajuste de estoque', label: 'Ajuste de estoque' },
    { id: 2, value: 'Alterar endereço de estoque', label: 'Alterar endereço de estoque' },
    { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' },
    { id: 4, value: 'Entrada de material', label: 'Entrada de material' },
    { id: 5, value: 'Saída de material', label: 'Saída de material' },
    { id: 6, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
  ]

  const getData = async () => {
    try {
      setIsProcessing(true);
      console.log(filter)
      const response = await api.get('movements', { params: filter });
      var sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);
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
  }, [filter]);

  const orderByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByType = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByDestination = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.destination.localeCompare(b.destination)
        : b.destination.localeCompare(a.destination);
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderBySku = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.itemId - b.itemId
        : b.itemId - a.itemId;
    });
    setData(sortedData);
    setAsc(!asc);
  };

  const orderByUser = () => {
    const sortedData = [...data].sort((a, b) => {
      return asc
        ? a.User.name.localeCompare(b.User.name)
        : b.User.name.localeCompare(a.User.name);
    });
    setData(sortedData);
    setAsc(!asc);
  };  

  let colapse = true;
  let filtered = false

  const filterCollapse = () => {
    if (colapse) {
      document.getElementById("up").style.display = "none";
      document.getElementById("down").style.display = "block";
      document.getElementById("filters").style.display = "none";
      colapse = false;
    } else {
      document.getElementById("up").style.display = "block";
      document.getElementById("down").style.display = "none";
      document.getElementById("filters").style.display = "block";
      colapse = true;
    }
    if(filtered){
      document.getElementById("openFilters").style.display = "none";
      document.getElementById("clearFilters").style.display = "block";
    }else{
      document.getElementById("openFilters").style.display = "block";
      document.getElementById("clearFilters").style.display = "none";
    }
  }

  const clearFilters = () => {
    setFilter({
      dataIni: '',
      dataFim: '',
      type: '',
      destination: '',
      localId: '',
      itemId: '',
      userId: '',
    });
    filtered = false
  }

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
    filtered= true
  };

  return (
    <div className="pl-16 pt-20">
      {isProcessing ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <div className="z-10 mt-2 relative shadow-lg rounded-md mr-2 p-2 pb-0.5 bg-gray-200">
            <div className='flex text-gray-600 mb-2'>
              <div id="openFilters" className='text-left w-40'>
                <span className='font-semibold flex items-center'>
                  <Filter className='mr-2 h-4 w-4' />Filtrar
                </span>
              </div>
              <div id="clearFilters" className='text-left w-40 hidden hover:text-orange-500 cursor-alias'>
                <span className='font-semibold flex items-center' title='Clique para limpar todos os filtros' onClick={clearFilters}>
                  <FilterX className='mr-2 h-4 w-4' />Limpar Filtros
                </span>
              </div>
              <div className='flex items-center justify-end cursor-pointer w-full' onClick={filterCollapse}>
                <ChevronDown id='down' className='cursor-pointer hidden'/>
                <ChevronUp id='up' className='cursor-pointer' />
              </div>
            </div>
            <div id="filters">
              <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 p-2 mb-2">
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">Data inicial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !filter.dataIni && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filter.dataIni ? getDate(filter.dataIni) : <span>Selecione...</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        locale={ptBR}
                        mode="single"
                        selected={filter.dataIni}
                        onSelect={(date) => handleFilterChange('dataIni', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">Data final</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !filter.dataFim && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filter.dataFim ? getEndDate(filter.dataFim) : <span>Selecione...</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        locale={ptBR}
                        mode="single"
                        selected={filter.dataFim}
                        onSelect={(date) => handleFilterChange('dataFim', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">Tipo</Label>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={types.find(option => option.value === field.value)}
                        options={types}
                        placeholder="Todas"
                        className="w-full"
                        styles={styles}
                        onChange={(selected) => {
                          field.onChange(selected.value);
                          handleFilterChange('type', selected.value); // Atualize o filtro
                        }}
                      />
                    )}
                  />
                </div>
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">Destino</Label>
                  <Input
                  type="text"
                  value={filter.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                />
                </div>
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">SKU</Label>
                  <Input type="text" />
                </div>
                <div className='grid'>
                  <Label className="ml-2 uppercase text-gray-400 text-xs">Colaborador</Label>
                  <Input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 pb-0 bg-gray-200">
            <div className='overflow-x-auto rounded-md shadow-md'>
              <table className="w-full text-xs xs:text-sm text-blue-900">
                <caption className="caption-bottom my-1 text-gray-400">
                  Total de registros: {data.length}
                </caption>
                <thead>
                  <tr className="text-xs h-6 text-white text-left uppercase bg-gradient-to-r from-blue-950 to-lime-400">
                    <th>
                      <ArrowUpDown size={12} className='ml-2 absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDate} />
                      <span className='ml-6'>Data</span>
                    </th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByType} />
                      <span className='ml-4'>Tipo</span></th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByDestination} />
                      <span className='ml-4'>Destino</span></th>
                    <th>Quantidade</th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderBySku} />
                      <span className='ml-4'>Item SKU</span></th>
                    <th><ArrowUpDown size={12} className='absolute mt-0.5 hover:text-lime-400 cursor-pointer' onClick={orderByUser} />
                      <span className='ml-4'>Colaborador</span></th>
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
        </>
      )}
    </div>
  );
};

export default Movements;
