import { useState } from "react";
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
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function UpdatePassWord() {
    const { id } = useParams();
    const { toast } = useToast()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const mySubmit = async (values) => {
      if(values.password != user.password){
        toast({
          title: "Falha!",
          description: 'A senha atual não confere!',
        })
        return
      }
      if(values.password1 != values.password2){
        toast({
          title: "Falha!",
          description: 'A senhas não coincidem!',
        })
        return
      }
      if(values.code != user.code){
        toast({
          title: "Falha!",
          description: 'O código não confere!',
        })
        return
      }
      //Set Values
      try {
        setIsProcessing(true);
        const response = await api.put('auth/update', values);
        setUser(response.data.user);
        console.log(response.data.user);
        if (response.status === 200) {
          toast({
            title: "Atualizado!",
            description: response.data.msg,
          })
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
        <AlertDialog>
            <AlertDialogTrigger>
                <ButtonAdd />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>Novo Fabricante</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={handleSubmit(mySubmit)}>
                            <Input {...register("email", { required: true })} placeholder="Insira o seu e-mail" />
                            <Input {...register("code", { required: true })} placeholder="Insira o código recebido por e-mail" />
                            <Input {...register("password", { required: true })} placeholder="Insira a senha atual" className="mt-2"/>
                            <Input {...register("password1", { required: true })} placeholder="Insira a nova senha" className="mt-2"/>
                            <Input {...register("password2", { required: true })} placeholder="Repita a nova senha" className="mt-2"/>
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction type="submit" className="bg-blue-700 hover:bg-blue-500">Atualizar</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
