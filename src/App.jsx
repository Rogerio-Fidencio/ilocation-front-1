import { Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthProvider';
import { OrderProvider } from './context/OrderProvider';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
//import ServerError from './pages/ServerError';
import './app.css';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <div className="app">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/pedidos' element={<Orders />} />
            <Route path='/rastreio' element={<Tracking />} />
            {/* <Route path='/server_internal_error' element={<ServerError />} /> */}
          </Routes>
        </div>
      </OrderProvider>
    </AuthProvider>
  );
}
export default App;