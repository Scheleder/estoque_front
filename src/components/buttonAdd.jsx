import React from 'react'
import { PenBox, Plus } from "lucide-react"
import { Button } from '@/components/ui/button';

const ButtonAdd = () => {
  return (
    <div className='flex text-right'><Button variant="outline" className="m-2 bg-lime-600 hover:bg-lime-500 text-white hover:text-white"><Plus />Adicionar</Button></div>
  )
}

export default ButtonAdd