import { React, useState } from 'react';
import { useNavigate  } from 'react-router'
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
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { AlertSuccess } from './AlertSuccess';
import { AlertFail } from './AlertFail';
import { useToast } from "@/components/ui/use-toast"

export function CategoryAdd() {
    
    const { toast } = useToast()
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    
    const mySubmit = async () => {
        console.log('Foi')
        const category = { name: document.getElementById('name').value}

        try {
            setIsProcessing(true);
            const response = await api.post('/categories', category);
            setData(response.data);
            console.log(response);
            if(response.statusText === 'Created'){
                toast({
                    title: "Sucesso!",
                    description: data.msg,
                  })
            }else{
                toast({
                    title: "Falha!",
                    description: data.msg,
                  })
            }
            navigate(0)
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
        <AlertDialog>
            <AlertDialogTrigger>
                <ButtonAdd />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>Nova Categoria</AlertDialogTitle>
                    <AlertDialogDescription>
                        
                            <Input id="name" placeholder="Insira o nome da categoria" className="" />
                        
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={mySubmit} className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
