import { useEffect, useState } from 'react'
import { Camera, Mail } from 'lucide-react';
import { Button } from './components/ui/button';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('aqui')
  }, [count]);



  return (
    <>


      <div className="ml-10 p-8">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        {/* <Camera color="green" size={48} />
        <Button variant="default">default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="default"><Mail className="mr-2 h-4 w-4" /> Login with Email</Button> */}
      </div>

    </>
  )
}

export default App
