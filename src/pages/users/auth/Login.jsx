import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/services/api'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router'
import { LogIn, Eye, EyeOff } from "lucide-react";
import Cookies from 'js-cookie';


export const Login = () => {
  let  response = {status:200,data:{msg:'Entre com suas credenciais'}};
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [passVisible, setPassVisible] = useState(true);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {

    try {
      setIsProcessing(true);
      response = await api.post('/auth/login', values);

      if(response.data.msg == "code"){
        return navigate(`/confirm-email/${response.data.id}`)
      }
      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(token)
        var in30Minutes = 1/48;
        Cookies.set('token', token, { expires: in30Minutes, sameSite: 'strict', secure: true });
        Cookies.set('user', JSON.stringify(user)), {expires: in30Minutes, sameSite: 'strict'};
        localStorage.setItem('settingsPage', 'users')
        toast({
          title: user.name,
          description: response.data.msg,
        })
        setTimeout(function () {
         return navigate('/')
        }, 1500);
      } else {
        toast({
          title: "Falha!",
          description: response.data.msg,
        })
      }
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

  const togglePass = () =>{
    setPassVisible(!passVisible)
    let inputPassword = document.getElementById('inputPassword');
    if(passVisible){
      inputPassword.type='text';
    }
    else{
        inputPassword.type='password';
      }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-16 w-fit flex items-center justify-center py-4 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
        <div className="grid w-[350px] gap-4">
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className="grid gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Acessar</h1>
              { response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>}              
            </div>
            <div className="grid gap-2">
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
                <div className="flex relative items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a className='absolute z-10 top-8 right-4 text-gray-400 cursor-pointer' title="Mostrar Senha" onClick={togglePass}>{ passVisible ? <Eye /> : <EyeOff />}</a>
                  
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu a sua senha?
                  </Link>
                </div>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  id="inputPassword"
                  required />
              </div>
              <Button type="submit" className="w-full mt-8">
                <LogIn className="w-4 h-4 mr-2" /> Entrar no Sistema
              </Button>
              {/* <Button variant="outline" className="w-full">
              Entrar com o Google
            </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Não é cadastrado? {" "}
              <Link to="/register" className="underline">
                Registre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
