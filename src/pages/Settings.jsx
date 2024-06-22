import React from 'react'

const Settings = (props) => {
    return (
        <div className="pl-16 pt-20">
            <h1>Configurações</h1>
            <div class="border-b border-gray-200">
                <ul class="sm:flex sm:flex-wrap mb-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li class="mr-2">
                        <a href="#" class="inline-flex p-4 text-gray-400 border-b-4 border-blue-400 rounded-t-lg hover:text-gray-500 hover:border-gray-400 group">
                            <svg class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
                            </svg>
                            <span>Fabricantes</span>
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="#" class="inline-flex p-4 text-gray-400 border-b-4 border-transparent rounded-t-lg hover:text-gray-500 hover:border-gray-400 group">
                            <svg class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
                            </svg>
                            <span>Categorias</span>
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="#" class="inline-flex p-4 text-gray-400 border-b-4 border-transparent rounded-t-lg hover:text-gray-500 hover:border-gray-400 group">
                            <svg class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
                            </svg>
                            <span>Componentes</span>
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="#" class="inline-flex p-4 text-gray-400 border-b-4 border-transparent rounded-t-lg hover:text-gray-500 hover:border-gray-400 group">
                            <svg class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
                            </svg>
                            <span>Usuários</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Settings