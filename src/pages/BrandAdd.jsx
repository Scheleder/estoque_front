import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
  
  export function BrandAdd() {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonAdd />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Novo Fabricante</AlertDialogTitle>
            <AlertDialogDescription>
              <Input placeholder="Insira o nome do fabricante" className=""/>
              <Input placeholder="Website do fabricante" className=" mt-2"/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className= "bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  