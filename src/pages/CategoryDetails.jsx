import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import api from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import { Eye, Send, Save, Earth } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const CategoryDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            setIsProcessing(true);
            const response = await api.get(`categories/${id}`);
            setCategory(response.data.category);
            console.log(response.data.category);
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
                                <label>Categoria:</label>
                            </div>
                            <div className='col-span-1 mt-2'></div>
                            <div className='col-span-2'>
                                <Input placeholder="Categoria" className="bg-white mr-4" value={category.name} />
                            </div>
                            <div className='flex col-span-1'>
                                <Button className="ml-4 w-full bg-blue-700 hover:bg-blue-500"><Save className='w-5 h-5 mr-2' /> Salvar alterações</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CategoryDetails