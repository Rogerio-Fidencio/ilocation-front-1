import { createContext } from 'react';
import useOrderState from '../hooks/useOrderState';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const order = useOrderState();

  return (
    <OrderContext.Provider value={order}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;