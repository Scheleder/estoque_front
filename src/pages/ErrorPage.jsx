import React from 'react'

const ErrorPage = ({error}) => {
  return (
    <div className="pl-16 pt-20">
      <div className="error">Erro ao carregar os dados: {error.message}
      </div>
    </div>
  )
}

export default ErrorPage