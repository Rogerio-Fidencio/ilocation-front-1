import { useState } from 'react';

function useOrderState() {
  const [ orderInfo, setOrderInfo ] = useState({
    id: '', customerName: '', customerCep: '', 
    customerNumRes: '', customerCompl: ''
  });

  return {
    orderInfo,
    setOrderInfo
  };
}

export default useOrderState;