import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

//apenas responsável por exportar o uso do contexto
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;