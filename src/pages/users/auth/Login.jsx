import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Login = () => {
  
  return (
    <div className="w-full h-full grid grid-cols-2 p-24">
      <div className="flex items-center justify-center py-12 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
        <div className="mx-auto grid w-[350px] gap-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Acessar</h1>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seunome@grupoboticario.com.br"
                required
              />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu a sua senha?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-4">
              Entrar
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
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/fundo2.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
