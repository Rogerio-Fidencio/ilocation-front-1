import { useContext } from 'react';
import OrderContext from '../context/OrderProvider';

function useOrder() {
  return useContext(OrderContext);
}

export default useOrder;