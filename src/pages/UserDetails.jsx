import { Button } from '@/components/ui/button';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'



const UserDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleContact = ()=>{
    console.log("Contato enviado!");
    return navigate("/users");
  };

  return (
    <div className="pl-16 pt-20">User {id}
    <br/>
      <Button variant="default" onClick={handleContact}>
        Enviar Mensagem
      </Button>
    </div>
  )
}

export default UserDetails