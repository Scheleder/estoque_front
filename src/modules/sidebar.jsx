import * as React from "react"
import { Link } from "react-router-dom"

import {
    Copyright,
    Package,
    Package2,
    Home,
    LineChart,
    Puzzle,
    Settings,
    AlignHorizontalDistributeCenter as Piece,
    ArrowRightLeft as Moves,
    ShoppingBasket,
} from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Sidebar = (props) => {
    return (
        <>
            <div className="flex min-h-screen w-12 flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-12 flex-col border-r bg-zinc-100 sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 py-4">
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/">
                                            <Home className="hover:text-red-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-red-200">Página Inicial</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/items">
                                            <Piece className="hover:text-purple-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-purple-100">Itens de Estoque</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/supply">
                                            <Package2 className="hover:text-cyan-400" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-cyan-100">Entrada de Material</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/takeout">
                                            <ShoppingBasket className="hover:text-lime-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lime-100">Saída de Material</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/moves">
                                            <Moves className="hover:text-yellow-300" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-yellow-100">Movimentações</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/settings">
                                            <Settings className="hover:text-orange-600" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-orange-200">Configurações</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default Sidebar