import * as React from "react"
import { useEffect, useState } from 'react'

const Home = (props) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('aqui')
  }, [count]);

  return (
    <>
      <div className="pt-20 pl-16">
        <h1>Controle de Estoque</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default Home