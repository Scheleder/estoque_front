import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import Logo from '../assets/logo.jsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"
import Pagetitle from "@/components/pagetitle.jsx"


const Header = () => {
  const location = useLocation();
  //console.log(location)
  var title = 'Gerenciamento de Estoque';
  if (location) {
    switch (true) {
      case location.pathname === '/':
        title = 'Gerenciamento de Estoque'
        break;
      case location.pathname === '/items':
        title = 'Itens de Estoque'
        break;
      case location.pathname === '/users':
        title = 'Usuários'
        break;
      case location.pathname === '/moves':
        title = 'Movimentações de Estoque'
        break;
      case location.pathname === '/settings':
        title = 'Configurações'
        break;
      case location.pathname === '/brands':
        title = 'Fabricantes'
        break;
      case location.pathname === '/categories':
        title = 'Categorias'
        break;
      case location.pathname === '/units':
        title = 'Unidades de Medida'
        break;
      case location.pathname === '/supply':
        title = 'Entrada de Material'
        break;
      case location.pathname === '/takeout':
        title = 'Saída de Material'
        break;
      case location.pathname.includes('/users/'):
        title = 'Meu perfil'
        break;
      default:
        title = 'Gerenciamento de Estoque'
        break;
    }

  }

  return (
    <>
      <div className="will-change-scroll fixed z-0 w-full h-16 flex gap-4 grid-cols-4 grid-rows-1 justify-between pl-16 px-2 py-2 bg-zinc-50 border-b-zinc-100 border-b-2">

        <div>
          <Pagetitle title={title} />
        </div>

        <div className="flex justify-end">
          <Logo className="mx-8"/>

          <DropdownMenu className="z-0">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mt-2 mx-4"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/scheleder.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/users/1">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/users">
                  Ajuda
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="logout">
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </>
  )
}

export default Header