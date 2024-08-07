import React from 'react'
import { useState } from 'react';
import Brands from './brands/Brands';
import Categories from './categories/Categories';
import Components from './components/Components';
import Units from './units/Units';
import Loading from '@/components/loading';
import Users from './users/Users';
import Locals from './locals/Locals';
import { Link } from 'react-router-dom';
import { Ruler, Factory, ListCollapse, UsersRound, Warehouse, Menu, EllipsisVertical,AlignHorizontalDistributeCenter as Piece } from 'lucide-react';
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

const Settings = (props) => {

    const savedPage = localStorage.getItem('settingsPage');
    const [page, setPage] = useState(savedPage);
    const [collapse, setCollapse] = useState(false);

    const changePage = (pg) => {
        setPage(pg);
        toggleMenu();
        localStorage.setItem('settingsPage', pg)
    }

    const toggleMenu = () => {
        setCollapse(!collapse)
    }

    const classActive = 'bg-gray-200 text-gray-600'
    const classInactive = 'md:flex bg-gray-200'
    const xsMenu = 'inline-flex p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-300 hover:border-blue-400  border-b-4 group w-full'

    return (
        <div className="pl-16 pt-20">
            <div className="mr-2 relative">
                <span className='absolute top-1 right-4 md:hidden'>
                    <Menu className='text-gray-500 cursor-pointer' onClick={toggleMenu}/>
                </span>
                <ul className="md:hidden mb-0 uppercase text-xs font-semibold text-center mx-1">
                    <li className="mx-0.5 md:ml-1 cursor-pointer">
                        <a onClick={() => changePage('brands')} className={`${(page === 'brands' ? classActive : classInactive)} ${(collapse && page != 'brands' ? 'hidden' : xsMenu)} rounded-t-lg`}>
                            <Factory className={`${(page === 'brands' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Fabricantes</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('categories')} className={`${(page === 'categories' ? classActive : classInactive)} ${(collapse && page != 'categories' ? 'hidden' : xsMenu)} ${(collapse && page === 'categories' ? ' rounded-t-lg' : '')}`}>
                            <ListCollapse className={`${(page === 'categories' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Categorias</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('components')} className={`${(page === 'components' ? classActive : classInactive)} ${(collapse && page != 'components' ? 'hidden' : xsMenu)} ${(collapse && page === 'components' ? ' rounded-t-lg' : '')}`}>
                            <Piece className={`${(page === 'components' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Componentes</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('units')} className={`${(page === 'units' ? classActive : classInactive)} ${(collapse && page != 'units' ? 'hidden' : xsMenu)} ${(collapse && page === 'units' ? ' rounded-t-lg' : '')}`}>
                            <Ruler className={`${(page === 'units' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Unidades</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('locals')} className={`${(page === 'locals' ? classActive : classInactive)} ${(collapse && page != 'locals' ? 'hidden' : xsMenu)} ${(collapse && page === 'locals' ? ' rounded-t-lg' : '')}`}>
                            <Warehouse className={`${(page === 'locals' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Estoques</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('users')} className={`${(page === 'users' ? classActive : classInactive)} ${(collapse && page != 'users' ? 'hidden' : xsMenu)} ${(collapse && page === 'users' ? ' rounded-t-lg' : '')}`}>
                            <UsersRound className={`${(page === 'users' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Usuários</span>
                        </a>
                    </li>
                </ul>

                <ul className="hidden md:flex md:flex-wrap mb-0 uppercase text-xs font-semibold text-center">
                    <li className="mx-0.5 md:ml-1 cursor-pointer">
                        <a onClick={() => changePage('brands')} className={`${(page === 'brands' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <Factory className={`${(page === 'brands' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Fabricantes</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('categories')} className={`${(page === 'categories' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <ListCollapse className={`${(page === 'categories' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Categorias</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('components')} className={`${(page === 'components' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <Piece className={`${(page === 'components' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Componentes</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('units')} className={`${(page === 'units' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <Ruler className={`${(page === 'units' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Unidades</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('locals')} className={`${(page === 'locals' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <Warehouse className={`${(page === 'locals' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Estoques</span>
                        </a>
                    </li>
                    <li className="mx-0.5 cursor-pointer">
                        <a onClick={() => changePage('users')} className={`${(page === 'users' ? classActive : classInactive)} inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32`}>
                            <UsersRound className={`${(page === 'users' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Usuários</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className='shadow-xl rounded-md mr-2 bg-gray-200'>
                {page === 'brands' ? (
                    <Brands />
                )
                    : page === 'categories' ? (
                        <Categories />
                    )
                        : page === 'components' ? (
                            <Components />
                        )
                            : page === 'units' ? (
                                <Units />
                            )
                                : page === 'locals' ? (
                                    <Locals />
                                )
                                    : page === 'users' ? (
                                        <Users />
                                    )
                                        : (
                                            <Loading />
                                        )
                }
            </div>
        </div>
    )
}

export default Settings