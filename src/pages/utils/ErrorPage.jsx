import { CircleX, Ban } from 'lucide-react'
import React from 'react'

const ErrorPage = ({ error }) => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className="border-2 border-red-700 rounded-lg bg-gray-300 opacity-90 w-fit flex items-center p-4">
        <Ban className='text-red-700 mr-2' /> 
        <span className='font-semibold text-xl text-red-700'>
          {error.message}
        </span>
      </div>
    </div>
  )
}

export default ErrorPage