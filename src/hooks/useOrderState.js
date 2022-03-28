import { useState } from 'react';

function useOrderState() {
  const [ orderInfo, setOrderInfo ] = useState({
    id: '', endereco: '', distancia: ''
  });

  return {
    orderInfo,
    setOrderInfo
  };
}

export default useOrderState;