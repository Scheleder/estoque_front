import React from 'react';
import { useState } from "react";
import api from './config';

export const getAll = async (endpoint) => {
    const [data, setData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
  
      try {
        await api.get()
          .then((response) => {
            setData(response.data)
            console.log(response.data)
          })
          .catch((err) => {
            setError(err);
            console.log(error)
          })
          .finally(() => {
            setIsProcessing(false);
          })
      } catch (error) {
        return (<p>{error}</p>)
      }

    return { data, isProcessing, error };
}
