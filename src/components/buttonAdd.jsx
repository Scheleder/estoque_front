import React from 'react'
import { PenBox, Plus } from "lucide-react"
import { Button } from '@/components/ui/button';

const ButtonAdd = () => {
  return (
    <div className='float-right m-2'><Button variant="outline" className="bg-lime-400 hover:bg-lime-300 text-white hover:text-white"><Plus />Adicionar</Button></div>
  )
}

export default ButtonAdd