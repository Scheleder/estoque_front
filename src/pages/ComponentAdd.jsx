import { React, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import api from '@/services/config';
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

import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import Select from 'react-select'
import { Loader } from 'lucide-react';

export function ComponentAdd() {

    const { toast } = useToast()
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
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


    const mySubmit = async (values) => {

        try {
            setIsProcessing(true);
            const response = await api.post('/units', values);
            console.log(response);
            if (response.status === 201) {
                setData(response.data.local);
                toast({
                    title: "Sucesso!",
                    description: response.data.msg,
                })
            } else {
                toast({
                    title: "Falha!",
                    description: response.data.msg,
                })
            }
            setTimeout(function () {
                navigate(0)
            }, 1500);
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
                <div className=''><Button variant="outline" className="m-2 bg-lime-600 hover:bg-lime-500 text-white hover:text-white"><Loader className='animate-spin' />Adicionar</Button></div>
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
                                <form onSubmit={handleSubmit(mySubmit)}>
                                    <Select {...register("categoryId", { required: true })} options={categories} placeholder="Selecione a categoria" className='mt-2' styles={styles} />
                                    <Select {...register("brandId", { required: true })} options={brands} placeholder="Selecione o fabricante" className='mt-2' styles={styles} />
                                    <Select {...register("unityId", { required: true })} options={units} placeholder="Selecione a unidade de medida" className='mt-2' styles={styles} />
                                    <Input {...register("description", { required: true })} placeholder="Insira descrição" className="mt-2" />
                                    <Input {...register("sku", { required: false })} placeholder="Insira o SKU" className="mt-2" />
                                    <Input {...register("barcode", { required: false })} placeholder="Insira o código de barras" className="mt-2" />
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction type="submit" className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}
