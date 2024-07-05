import * as React from "react"
import { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const Home = (props) => {
  const { toast } = useToast()
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('home')
  }, [count]);

  return (
    <>
      <div className="pt-20 pl-16 pr-4 h-screen">
        <h1>Controle de Estoque</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button className="bg-red-500 text-white" onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}>
        TOAST
      </button>
    
      </div>
    </>
  )
}

export default Home