import React from 'react'
import { useState } from 'react';
import Brands from './Brands';
import Categories from './Categories';
import Components from './Components';
import Units from './Units';
import Loading from '@/components/loading';
import Users from './Users';
import { Ruler, Factory, ListCollapse, UsersRound, CloudDownload, AlignHorizontalDistributeCenter as Piece } from 'lucide-react';


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
                <ul className="sm:flex sm:flex-wrap mb-0 uppercase text-xs font-semibold text-center">
                    <li className="mx-0.5">
                        <a onClick={() => changePage('brands')} className={`${(page === 'brands' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Factory className={`${(page === 'brands' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Fabricantes</span>
                        </a>
                    </li>
                    <li className="mx-0.5">
                        <a onClick={() => changePage('categories')} className={`${(page === 'categories' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <ListCollapse className={`${(page === 'categories' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Categorias</span>
                        </a>
                    </li>
                    <li className="mx-0.5">
                        <a onClick={() => changePage('components')} className={`${(page === 'components' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Piece className={`${(page === 'components' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Componentes</span>
                        </a>
                    </li>
                    <li className="mx-0.5">
                        <a onClick={() => changePage('units')} className={`${(page === 'units' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
                            <Ruler className={`${(page === 'units' ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1')}`} />
                            <span>Unidades</span>
                        </a>
                    </li>
                    <li className="mx-0.5">
                        <a onClick={() => changePage('users')} className={`${(page === 'users' ? 'border-blue-400 bg-gray-300 text-gray-600' : 'border-transparent bg-gray-200')} inline-flex p-2 text-gray-400 border-b-4 sm:rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full sm:w-32`}>
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