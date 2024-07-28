import React from 'react'

const ComponentInfo = ({ comp, fab }) => {
    console.log(comp, fab)
    return (
        <div className="mt-4 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
            <span className='text-gray-600 font-lg'>Detalhes do componente  {comp}</span>
        </div>
    )
}

export default ComponentInfo

/* 
import React, { useState } from 'react';
import { getChatGPTResponse } from './api'; // Supondo que você salvou a função acima em um arquivo api.js

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const gptResponse = await getChatGPTResponse(input);
    setResponse(gptResponse);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Enviar</button>
      <p>Resposta: {response}</p>
    </div>
  );
};

export default ChatComponent;

 */