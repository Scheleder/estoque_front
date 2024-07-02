import React from 'react'
import { PenBox, Plus } from "lucide-react"
import { Button } from '@/components/ui/button';

const ButtonAdd = () => {
  return (
    <div className='text-right'><Button variant="outline" className="m-2 bg-lime-400 hover:bg-lime-300 text-white hover:text-white"><Plus />Adicionar</Button></div>
  )
}

export default ButtonAdd