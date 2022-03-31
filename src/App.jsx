import { Navigate, Routes, Route, useLocation } from 'react-router';
//import useAuth from './hooks/useAuth';
import { AuthProvider } from './context/AuthProvider';
import { OrderProvider } from './context/OrderProvider';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
//import ServerError from './pages/ServerError';
import './app.css';

//criação de componente para verificar a autenticação, se nåo tiver, o usuário é redirecionado para a tela de login
// function Auth({ children }) {
//   const { getToken } = useAuth();
//   const { pathname } = useLocation();

//   return (
//     getToken() ? children  
//     : <Navigate to='/login' replace state={{ path: pathname }} />
//   );
// }

function combineProviders(providers) {
  return providers.reduce((Combined, Provider) => ({ children }) => {
    <Combined>
      <Provider>{children}</Provider>                  
    </Combined>  
  });
}

function App() {
  const Providers = combineProviders([
    AuthProvider,
    OrderProvider
  ]);

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