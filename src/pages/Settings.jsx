import React from 'react'
import { useState } from 'react';
import Brands from './brands/Brands';
import Categories from './categories/Categories';
import Components from './components/Components';
import Units from './units/Units';
import Loading from '@/components/loading';
import Users from './users/Users';
import Locals from './locals/Locals';
import { Ruler, Factory, ListCollapse, UsersRound, Warehouse, Menu, EllipsisVertical, AlignHorizontalDistributeCenter as Piece } from 'lucide-react';

const Settings = (props) => {

    const savedPage = localStorage.getItem('settingsPage');
    const [page, setPage] = useState(savedPage);
    const [collapse, setCollapse] = useState(true);

    const changePage = (pg) => {
        setPage(pg);
        toggleMenu();
        localStorage.setItem('settingsPage', pg)
    }

    const toggleMenu = () => {
        setCollapse(!collapse)
    }

    function renderMenuItem(pageName, label, IconComponent, isMd = false) {
        const isActive = page === pageName;
        const classActive = 'bg-gray-300 text-gray-600'
        const classInactive = 'md:flex bg-gray-200'
        const xsMenu = 'inline-flex p-2 text-gray-400 hover:text-gray-500 hover:border-blue-400 bg-gray-300 border-gray-300 hover:bg-gray-400 border-b-4 group w-full'

        const commonClasses = `${isActive ? classActive : classInactive}`;
        const collapseClasses = collapse && page !== pageName ? 'hidden' : xsMenu;
        const roundedClasses = collapse && page === pageName ? 'rounded-t-lg' : '';
        const iconClasses = `${isActive ? 'text-blue-500 w-4 h-4 mr-1' : 'w-4 h-4 mr-1'}`;
        const mdClasses = isMd ? 'inline-flex p-2 text-gray-400 border-b-4 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group w-full md:w-32' : '';

        return (
            <li className="mx-0.5 cursor-pointer">
                <a onClick={() => changePage(pageName)} className={`${commonClasses} ${collapseClasses} ${roundedClasses} ${mdClasses}`}>
                    <IconComponent className={iconClasses} />
                    <span>{label}</span>
                </a>
            </li>
        );
    }



    return (
        <div className="pl-16 pt-20">

            <div className="mr-2 relative">
                <span className='absolute top-1 right-4 md:hidden'>
                    <Menu className='text-gray-500 cursor-pointer hover:text-lime-500' onClick={toggleMenu} />
                </span>

                <ul className="md:hidden mb-0 uppercase text-xs font-semibold text-center mx-1">
                    {renderMenuItem('brands', 'Fabricantes', Factory)}
                    {renderMenuItem('categories', 'Categorias', ListCollapse)}
                    {renderMenuItem('components', 'Componentes', Piece)}
                    {renderMenuItem('units', 'Unidades', Ruler)}
                    {renderMenuItem('locals', 'Estoques', Warehouse)}
                    {renderMenuItem('users', 'Usuários', UsersRound)}
                </ul>

                <ul className="hidden md:flex md:flex-wrap mb-0 uppercase text-xs font-semibold text-center">
                    {renderMenuItem('brands', 'Fabricantes', Factory, true)}
                    {renderMenuItem('categories', 'Categorias', ListCollapse, true)}
                    {renderMenuItem('components', 'Componentes', Piece, true)}
                    {renderMenuItem('units', 'Unidades', Ruler, true)}
                    {renderMenuItem('locals', 'Estoques', Warehouse, true)}
                    {renderMenuItem('users', 'Usuários', UsersRound, true)}
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