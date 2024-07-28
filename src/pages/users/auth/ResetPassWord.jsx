import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router'
import { api } from '@/services/api';
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { Send, X } from "lucide-react";

let response = { status: 200, data: { msg: 'Digite o seu endereço de e-mail' } };

export const ResetPassWord = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {
    try {
      setIsProcessing(true);
      response = await api.post('auth/reset', values);
      console.log(response)
      if (response.status === 201) {
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        })
        setTimeout(function () {
          navigate('/update-password')
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
      <div className="relative px-16 w-fit flex items-center justify-center py-4 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
        <Link to="/">
          <X className="absolute right-2 top-2 text-black hover:text-red-600 hover:font-bold cursor-pointer" />
        </Link>
        <div className="w-[350px] gap-4">
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className="grid gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Reiniciar a senha</h1>
              {response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>}
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <div className="flex">
                  <Label htmlFor="email">E-mail</Label>
                </div>
                <Input
                  {...register("email", { required: true })}
                  type="mail"
                  required
                />
              </div>
              <Button type="submit" className="w-full my-8">
                <Send className="w-4 h-4 mr-2" /> Enviar Código
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
