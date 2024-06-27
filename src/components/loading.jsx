import React from 'react'
import { CloudDownload } from 'lucide-react'

const Loading = ({title}) => {
  return (
    <div className="flex text-blue-400 animate-bounce p-16">
        <CloudDownload className='mt-1 mr-2 mb-2 h-4 w-4'/><span>Carregando...</span>
    </div>
  )
}

export default Loading