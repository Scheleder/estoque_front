import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const useLogoff = () => {
  
  const navigate = useNavigate();
  const logoff = () => {
    Cookies.remove('token');
    Cookies.remove('user')
    //localStorage.removeItem('user');
    navigate('/login');
  };

  return logoff;
};

export default useLogoff;
