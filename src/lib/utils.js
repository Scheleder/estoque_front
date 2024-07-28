import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getDate(dt) {
  return format(new Date(dt), 'dd/MM/yyyy - HH:mm');
}

export const getLoggedUser = () => {
  const userString = Cookies.get('user') || null;
  console.log(userString)
  if (!userString) {
     return null;
   }
  return JSON.parse(userString);
};

export const getToken = () => {
  const token = Cookies.get('token') || null;
  console.log('TOKEN: '+token)

  if(!token){
    return null
  }

  return 'Bearer '+token
};

export const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token') || null;
    console.log(token)
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};