import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BrandDetails = () => {
    const { id } = useParams();

  return (
    <div>BrandDetails {id}</div>
  )
}

export default BrandDetails