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
      <div className="fixed z-0 w-full h-16 flex gap-4 grid-cols-4 grid-rows-1 justify-between pl-16 px-2 py-2 border-b-zinc-100 border-b-2">
        <div className="">
          <Logo />
        </div>        <div>
          <h2 className="font-light lg:text-3xl md:text-xl mt-4 text-zinc-400">Gerenciamento de Estoque</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-4 h-4 w-4 text-zinc-600" />
          <Input
            type="search"
            placeholder="Procurar..."
            className="w-full rounded-lg bg-zinc-50 px-8 mt-2 md:w-[200px] lg:w-[320px] text-center text-zinc-600"
          />
        </div>
        <div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full mt-2 mx-4 justify-end"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
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
                <Link to="/about">
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