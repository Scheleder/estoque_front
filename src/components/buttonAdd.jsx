import React from 'react'
import { Plus } from "lucide-react"

const ButtonAdd = () => {
  return (
    <>
      <a type="button" className="flex m-2.5 bg-lime-600 hover:bg-lime-500 text-white hover:text-white px-4 py-1.5 rounded-md hover:ring-1 hover:ring-lime-400"><Plus />
        Adicionar
      </a>
    </>
  )
}

export default ButtonAdd