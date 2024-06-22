import React from 'react'
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const components = [
  { value: '1', label: 'Um' },
  { value: '2', label: 'Dois' }
]

const categories = [
  { value: '1', label: 'Um' },
  { value: '2', label: 'Dois' }
]

const brands = [
  { value: '1', label: 'Um' },
  { value: '2', label: 'Dois' }
]

const Supply = (props) => {
  return (
    <div className="pl-16 pt-20"><h1>Entrada de Material</h1>
      <div class="grid md:gap-6">
        <div className='flex m-2'>
        <label>Componente</label>
        <Select options={components} placeholder="Selecione o componente" />

        <Button>Adicionar novo componente</Button>

        </div>
      </div>
      <div class="grid-cols-2 md:gap-6">
        <div className='flex'>
        <label>Fabricante</label>
        <Select options={brands} placeholder="Selecione o fabricante" />
        <Button>Adicionar novo fabricante</Button>
        </div>
        <div className='flex'>


        <label>Categoria</label>
        <Select options={categories} placeholder="Selecione a categoria" />
        <Button>Adicionar nova categoria</Button>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div className='flex'>
        <label htmlFor="">Endereço de estoque</label>
        <Input placeholder="Endereço de estoque"></Input>

        </div>
        <div className='flex'>
        <label htmlFor="">Quantidade</label>
        <Input placeholder="Quantidade"></Input>

        </div>
      </div>



    </div>
  )
}

export default Supply