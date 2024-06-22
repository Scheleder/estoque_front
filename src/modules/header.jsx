import * as React from "react"
import { Link } from "react-router-dom"
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

const Header = (props) => {
  return (
    <>
      <div className="will-change-scroll fixed z-0 w-full h-16 flex gap-4 grid-cols-4 grid-rows-1 justify-between pl-16 px-2 py-2 bg-zinc-50 border-b-zinc-100 border-b-2">

        <div>
          <h2 className="font-normal lg:text-2xl md:text-xl mt-4 text-orange-400">Gerenciamento de Estoque</h2>
        </div> 
        <div className="relative">
          <Search className="absolute left-2.5 top-6 h-4 w-4 text-zinc-600" />
          <Input
            type="search"
            placeholder="Procurar..."
            className="w-full mt-3 rounded-lg bg-white mb-2 px-8 md:w-[150px] lg:w-[200px] text-center text-zinc-600"
          />
        </div>
        <div className="">
          <Logo />
        </div>
        <div className="justify-end">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mt-2 mx-4 justify-end"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/scheleder.png"/>
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