import { Navigate, Routes, Route, useLocation } from 'react-router';
import useAuth from './hooks/useAuth';
//import { AuthProvider } from './context/AuthProvider';
import Login from './pages/Login';
//import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import './app.css';

// import { Button } from 'reactstrap';

//criação de componente para verificar a autenticação, se nåo tiver, o usuário é redirecionado para a tela de login
function Auth({ children }) {
  const { getToken } = useAuth();
  const { pathname } = useLocation();

  return (
    getToken() ? children  
    : <Navigate to='/login' replace state={{ path: pathname }} />
  );
}

function App(props) {
  return (



    //<AuthProvider>


      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />


          {/* <Route path='/orders' element={
            //<Auth>
              <Orders />
            //</Auth>
          } />
          <Route path='/tracking' element={
            //<Auth>
              <Tracking />
            //</Auth>
          } /> */}

          <Route path='/tracking' element={<Tracking/>}/>

          
        </Routes>
      </div>


    //</AuthProvider>
  );
}

// function App(props){
//   return(
//     <div>
//        <Button color="danger">Danger!</Button>
//     </div>
//   )
// }

export default App;