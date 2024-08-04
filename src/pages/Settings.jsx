import React from 'react'
import { useState } from 'react';
import Brands from './brands/Brands';
import Categories from './categories/Categories';
import Components from './components/Components';
import Units from './units/Units';
import Loading from '@/components/loading';
import Users from './users/Users';
import Locals from './locals/Locals';
import { Ruler, Factory, ListCollapse, UsersRound, Warehouse, AlignHorizontalDistributeCenter as Piece } from 'lucide-react';

const Settings = (props) => {

    const savedPage = localStorage.getItem('settingsPage');
    const [page, setPage] = useState(savedPage);

    const changePage = (pg) => {
        setPage(pg);
        localStorage.setItem('settingsPage', pg)
    }

    return (
        <div className="pl-16 pt-20">
            <div className="mr-2">
                <ul className="md:flex md:flex-wrap mb-0 uppercase text-xs font-semibold text-center hidden">
                    <li className="ml-0.5 md:ml-1 cursor-pointer">
                        <a onClick={() => changePage('brands')} className={`${(page === 'brands' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Factory className={`${(page === 'brands' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Fabricantes</span>
                        </a>
                    </li>
                    <li className="ml-0.5 cursor-pointer">
                        <a onClick={() => changePage('categories')} className={`${(page === 'categories' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <ListCollapse className={`${(page === 'categories' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Categorias</span>
                        </a>
                    </li>
                    <li className="ml-0.5 cursor-pointer">
                        <a onClick={() => changePage('components')} className={`${(page === 'components' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Piece className={`${(page === 'components' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Componentes</span>
                        </a>
                    </li>
                    <li className="ml-0.5 cursor-pointer">
                        <a onClick={() => changePage('units')} className={`${(page === 'units' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Ruler className={`${(page === 'units' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Unidades</span>
                        </a>
                    </li>
                    <li className="ml-0.5 cursor-pointer">
                        <a onClick={() => changePage('locals')} className={`${(page === 'locals' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Warehouse className={`${(page === 'locals' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Estoques</span>
                        </a>
                    </li>
                    <li className="ml-0.5 cursor-pointer">
                        <a onClick={() => changePage('users')} className={`${(page === 'users' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <UsersRound className={`${(page === 'users' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Usuários</span>
                        </a>
                    </li>
                </ul>
                <ul className='uppercase md:hidden bg-gray-200 p-2'>
                    <li className='hover:bg-gray-300'><span>Fabricantes</span></li>
                    <li className='hover:bg-gray-300'><span>Categorias</span></li>
                    <li className='hover:bg-gray-300'><span>Componentes</span></li>
                    <li className='hover:bg-gray-300'><span>Unidades</span></li>
                    <li className='hover:bg-gray-300'><span>Estoques</span></li>
                    <li className='hover:bg-gray-300'><span>Usuários</span></li>
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