import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import { api }  from '@/services/api';
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
import { useToast } from "@/components/ui/use-toast"

export function CategoryAdd() {

    const { toast } = useToast()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();

    const mySubmit = async (values) => {

        try {
            setIsProcessing(true);
            const response = await api.post('/categories', values);

            if (response.status === 201) {
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
                        <form onSubmit={handleSubmit(mySubmit)}>
                            <Input {...register("name", { required: true })} placeholder="Insira o nome da categoria" />
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction type="submit" className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}