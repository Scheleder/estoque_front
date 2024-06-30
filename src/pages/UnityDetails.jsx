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

const UnityDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [unity, setUnity] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            setIsProcessing(true);
            const response = await api.get(`units/${id}`);
            setUnity(response.data.unity);
            console.log(response.data.unity);
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
                            <div className='col-span-1 mt-2'>
                                <label>Unidade de medida:</label>
                            </div>
                            <div className='col-span-1 mt-2 pl-4'>
                                <label>Abreviação:</label>
                            </div>
                            <div className='col-span-1 mt-2'></div>
                            <div className='col-span-1'>
                                <Input placeholder="Unidade" className="bg-white" value={unity.name} />
                            </div>
                            <div className='col-span-1 px-4'>
                                <Input placeholder="Abreviação" className="bg-white" value={unity.abrev} />
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

export default UnityDetails