import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/services/api'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router'
import { LogIn, DoorOpen, Send, Wand } from "lucide-react";

let  response = {status:200,data:{msg:'Preencha o formulário'}};

export const UpdatePassWord = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {

    try {
      setIsProcessing(true);
      response = await api.post('/auth/update', values);
      console.log(response);
      if (response.status === 200) {
        toast({
          title: 'Sucesso!',
          description: response.data.msg,
        })
        setTimeout(function () {
          navigate('/login')
        }, 1500);
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
    <div className="flex items-center justify-center h-screen">
      <div className="px-16 w-fit flex items-center justify-center py-4 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
        <div className="w-[350px] gap-4">
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className="grid gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Recuperar a senha</h1>
              { response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>} 
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="code">Código</Label>
                <Input
                  {...register("code", { required: true })}
                  type="text"
                  placeholder="Código recebido por e-mail"
                  className="text-center"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="seunome@grupoboticario.com.br"
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="confirmpassword">Repita a senha</Label>
                </div>
                <Input
                  {...register("confirmpassword", { required: true })}
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                <Wand className="w-4 h-4 mr-2"/> Enviar Dados
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
