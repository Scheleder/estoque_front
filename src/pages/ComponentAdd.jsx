import { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import api from '@/services/config';
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import Select from 'react-select'
import ErrorPage from "./ErrorPage"
import Loading from '@/components/loading';
import { Loader } from 'lucide-react';

export function ComponentAdd() {

    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const styles = { menu: base => ({ ...base, marginTop: 0 }) };

    const getData = async () => {
        try {
            setIsProcessing(true);
            const [response1, response2, response3] = await Promise.all([
                api.get('units'),
                api.get('categories'),
                api.get('brands')
            ]);

            const sortedUnits = response1.data
                .map(item => ({ value: item.id, label: item.name }))
                .sort((a, b) => a.label.localeCompare(b.label));

            setUnits(sortedUnits);

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


    return (
        <>
            {isProcessing ? (
                <div className='text-right'><Button variant="outline" className="m-2 bg-lime-600 hover:bg-lime-500 text-white hover:text-white"><Loader className='animate-spin' />Adicionar</Button></div>
            ) : error ? (
                <ErrorPage error={error} />
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <ButtonAdd />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-100">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Novo Componente</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Select options={categories} placeholder="Selecione a categoria" className='w-full mt-2' styles={styles} />
                                <Select options={brands} placeholder="Selecione o fabricante" className='w-full mt-2' styles={styles} />
                                <Select options={units} placeholder="Selecione a unidade de medida" className='w-full mt-2' styles={styles} />
                                <Input placeholder="Insira a descrição" className=" mt-2" />
                                <Input placeholder="Insira o SKU" className=" mt-2" />
                                <Input placeholder="Insira o código de barras" className=" mt-2" />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}
