"use client"
import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from "react-hook-form";
import { ptBR } from 'date-fns/locale';
import { api } from '@/services/api';
import { Loader, RefreshCw, ArrowUpDown, Filter, ChevronDown, ChevronUp, CalendarIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { getDate, getEndDate } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ErrorPage from "../utils/ErrorPage";
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Movements = () => {
  const { control, setValue, reset } = useForm({
    defaultValues: {
      type: null,
      userId: null,
      itemId: null,
    }
  });
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [asc, setAsc] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [users, setUsers] = useState([]);
  const [destination, setDestination] = useState([]);
  const [skus, setSkus] = useState([]);

  const [filter, setFilter] = useState({
    dataIni: '',
    dataFim: '',
    type: null,
    destination: null,
    localId: '',
    itemId: null,
    userId: null,
  });

  const styles = {
    menu: base => ({
      ...base,
      marginTop: '0.3rem',
      zIndex: 999,
    }),
  };

  const types = [
    { id: 1, value: 'Ajuste de estoque', label: 'Ajuste de estoque' },
    { id: 2, value: 'Alterar endereço de estoque', label: 'Alterar endereço de estoque' },
    { id: 3, value: 'Consumo na ordem', label: 'Consumo na ordem' },
    { id: 4, value: 'Entrada de material', label: 'Entrada de material' },
    { id: 5, value: 'Saída de material', label: 'Saída de material' },
    { id: 6, value: 'Transferência para outro estoque', label: 'Transferência para outro estoque' },
  ];

  const getData = async () => {
    try {
      setIsProcessing(true);

      const response = await api.get('movements', { params: filter });
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sorted);
      console.log(sorted)
      const userMap = new Map();
      response.data.forEach(a => {
        if (!userMap.has(a.User.id)) {
          userMap.set(a.User.id, { value: a.User.id, label: a.User.name });
        }
      });
      setUsers(Array.from(userMap.values()));

      const skuMap = new Map();
      response.data.forEach(a => {
        if (!skuMap.has(a.Item.Component.id)) {
          skuMap.set(a.Item.Component.id, { value: a.Item.Component.id, label: a.Item.Component.sku });
        }
      });
      setSkus(Array.from(skuMap.values()));

    } catch (err) {
      setError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  useEffect(() => {
    setValue('type', null);
    setValue('userId', null);
    setValue('itemId', null);
  }, [setValue]);

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

  const filterCollapse = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setFilter({
      dataIni: '',
      dataFim: '',
      type: null,
      destination: '',
      localId: '',
      itemId: '',
      userId: null,
    });
    reset({
      type: null,
      userId: null,
      itemId: null,
      destination: '',
    });
    setValue('type', null);  // Explicitly set to null
    setValue('userId', null); // Explicitly set to null
    setValue('itemId', null); // Explicitly set to null]
    setDestination('');
  };

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
  };

  const isFilterApplied = useMemo(() => {
    return Object.values(filter).some(value => value);
  }, [filter]);

  return (
    <div className="pl-16 pt-20">
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <div className="z-10 mt-2 relative shadow-lg rounded-md mr-2 p-2 pb-0.5 bg-gray-200">
            <div className='flex text-gray-600 mb-2'>
              {isProcessing && (<span className='text-lime-600 flex items-center'><Loader className='animate-spin mr-2 h-4 w-4 font-bold' />Carregando...</span>)}
              {!isFilterApplied && !isProcessing && (
                <div id="openFilters" className='text-left w-40'>
                  <span className='font-semibold flex items-center'>
                    <Filter className='mr-2 h-4 w-4' />Filtrar
                  </span>
                </div>
              )}
              {isFilterApplied && !isProcessing && (
                <div id="clearFilters" className='text-left w-80 hover:text-red-800 cursor-pointer'>
                  <span className='font-semibold flex items-center hover:animate-pulse' title='Clique para limpar todos os filtros' onClick={clearFilters}>
                    <RefreshCw className='mr-2 h-4 w-4 hover:animate-spin' />Limpar Filtros
                  </span>
                </div>
              )}
              <div className='flex items-center justify-end cursor-pointer w-full' onClick={filterCollapse}>
                {showFilters ? <ChevronUp className='cursor-pointer' /> : <ChevronDown className='cursor-pointer' />}
              </div>
            </div>
            {showFilters && (
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
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={types.find(option => option.value === field.value) || null}
                          options={types}
                          placeholder="Todas"
                          className="w-full"
                          styles={styles}
                          onChange={(selected) => {
                            field.onChange(selected ? selected.value : null);
                            handleFilterChange('type', selected ? selected.value : null);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className='grid'>
                    <Label className="ml-2 uppercase text-gray-400 text-xs">Destino</Label>
                    <Input
                        type="text"
                        value={destination}
                        onChange={(e) => { setDestination(e.target.value); handleFilterChange('destination', e ? e.target.value : null);}}
                        className='w-full text-md'
                        placeholder='Todos'
                      />
                  </div>
                  <div className='grid'>
                    <Label className="ml-2 uppercase text-gray-400 text-xs">SKU</Label>
                    <Controller
                      name="itemId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={skus.find(option => option.value === field.value) || null}
                          options={skus}
                          placeholder="Todos"
                          className="w-full"
                          styles={styles}
                          onChange={(selected) => {
                            field.onChange(selected ? selected.value : null);
                            handleFilterChange('itemId', selected ? selected.value : null);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className='grid'>
                    <Label className="ml-2 uppercase text-gray-400 text-xs">Colaborador</Label>
                    <Controller
                      name="userId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={users.find(option => option.value === field.value) || null}
                          options={users}
                          placeholder="Todos"
                          className="w-full"
                          styles={styles}
                          onChange={(selected) => {
                            field.onChange(selected ? selected.value : null);
                            handleFilterChange('userId', selected ? selected.value : null);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DataTable data={data} 
            orderByDate={orderByDate}
            orderByType={orderByType}
            orderByDestination={orderByDestination}
            orderBySku={orderBySku}
            orderByUser={orderByUser}
          />
        </>
      )}
    </div>
  );
};

const DataTable = ({ data, orderByDate, orderByType, orderByDestination, orderBySku, orderByUser }) => {
  return (
    <div className="mt-2 relative overflow-x-auto shadow-lg rounded-md mr-2 p-2 pb-0 bg-gray-200">        
      <div className='overflow-x-auto rounded-md shadow-md'>
        <table className="w-full text-xs xs:text-sm text-blue-900">
          <caption className="caption-bottom my-1 text-gray-500">
            Total de registros: {data.length} - <span className='hover:text-red-800 cursor-pointer'>clique para exportar</span>
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
    </div>
  );
};

export default Movements;
