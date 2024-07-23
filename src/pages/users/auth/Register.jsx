import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Register = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 p-24">
      <div className="flex items-center justify-center py-6 bg-gray-100 overflow-hide rounded-lg shadow-md m-2">
        <div className="mx-auto grid w-[350px] gap-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Registrar</h1>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu Nome"
                required
              />
            </div>
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
              </div>
              <Input id="password1" type="password" required />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="password">Repita a senha</Label>
              </div>
              <Input id="password2" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-4">
              Registrar
            </Button>
            {/* <Button variant="outline" className="w-full">
              Entrar com o Google
            </Button> */}
          </div>
          <div className="mt-2 text-center text-sm">
            Já é cadastrado? {" "}
            <Link to="/login" className="underline">
              Entre
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
