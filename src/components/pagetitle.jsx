import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';

const Pagetitle = ({title}) => {
  const navigate = useNavigate();

  return (
    <>
        <Button variant="ghost" className="p-1 text-orange-400" title="Voltar" onClick={() => navigate(-1)}><ChevronLeft className='hover:animate-ping'/> </Button><span className=" text-2xl text-orange-400 ml-2">{title}</span>
    </>
  )
}

export default Pagetitle