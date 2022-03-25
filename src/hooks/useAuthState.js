import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AUTH_KEY = 'iLocationApp';

function useAuthState() {
  const navigate = useNavigate();
  const [ authData, setAuthData ] = useState();

  //observando qualquer mudança no authData, atualiza o storage
  useEffect(() => {
    if (authData != null) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    }
  }, [ authData ]);

  const getToken = () => {
    return getValue('token');
  };

  //função que retorna o que está armazenado se não estiver vazio
  const getValue = (key) => {
    if (authData != null) return authData[key];

    //pegando o que estiver no storage
    const storage = JSON.parse(localStorage.getItem(AUTH_KEY));

    if (storage != null) {
      setAuthData(storage);
      return JSON.parse(localStorage.getItem(AUTH_KEY))[key];
    }

    return null;
  };

  const logout = () => {
    setAuthData({});
    navigate('/login', { replace: true });
  }

  return {
    setAuthData,
    getToken,
    logout
  }
}

export default useAuthState;