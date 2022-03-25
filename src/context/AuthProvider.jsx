import { createContext } from 'react';
import useAuthState from '../hooks/useAuthState';

const AuthContext = createContext();

//provider do contexto auth (usado no App.jsx)
export function AuthProvider({ children }) {
  //estados que serão usados no contexto
  const auth = useAuthState();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

//contexto Auth em si
export default AuthContext;