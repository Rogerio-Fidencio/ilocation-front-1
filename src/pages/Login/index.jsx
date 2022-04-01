import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
import pinIcon from '../../assets/ilocation-logo.svg';
import closedEyeIcon from '../../assets/hide.png';
import openEyeIcon from '../../assets/view.png';
import './login.css';

function Login() {
  const { setAuthData } = useAuth();
  const { setOrderInfo } = useOrder();
  const [ user, setUser ] = useState({ emailOrPhone: '', password: ''});
  const [ error, setError ] = useState({ email: '', password: '' });
  const [ openEye, setOpenEye ] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (prop) => event => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    openEye ? setOpenEye(false) : setOpenEye(true);
  }

  const handleLogin = async(event) => {
    event.preventDefault();

    if (!user.emailOrPhone || !user.password) {
      if (!user.emailOrPhone) {
        setError({ email: '*Campo obrigatório', password: '' });
      }
      if (!user.password) {
        setError({ email: '', password: '*Campo obrigatório' });
      }
      if (!user.emailOrPhone && !user.password) {
        setError({ email: '*Campo obrigatório', password: '*Campo obrigatório' });
      }
      return;
    }

    const input = user.emailOrPhone.replace(' ', '');

    if (Number(input)) {
      if (input.length !== 11) {
        setError({ email: '*Formato inválido', password: '' });
        return;
      }

      setUser({ ...user, emailOrPhone: input });
    }

    setError({ email: '', password: '' });

    try {
      const requestLogin = await fetch('https://ilocation.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const response = await requestLogin.json();

      if (response.status > 204) return;

      setAuthData({
        token: response.access_token
      });

      const requestOrder = await fetch('https://ilocation.herokuapp.com/api/v1/deliveryperson/currentorder', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: response.access_token
        }
      });

      const order = await requestOrder.json()

      if (order.status > 204) {
        navigate('/pedidos', { replace: true });
        return;
      }

      setOrderInfo(order);
      navigate('/rastreio', { replace: true });
    } catch (error) {
      //console.log(error.message);
      // navigate('/server_internal_error', { replace: true });
    }
  };

  return (
    <div className='login-container'>
      <header className='ilocation-logo'>
        iLocati
        <img className="logo-icon" src={pinIcon} alt="pin map icon" />
        n
      </header>
      <Form className='form'>
        <div className='container-label first'>
          <Label className='form-label' for="email">
            Email ou telefone
          </Label>
        </div>
        <FormGroup className='form-group'>
          <Input 
            className='form-input' 
            type='email'
            onChange={handleChange('emailOrPhone')} 
            invalid={error.email ? true : false} 
          />
          <FormFeedback>
            {error.email && '*Campo obrigatório'}
          </FormFeedback>
        </FormGroup>

        <div className='container-label'>
          <Label className='form-label' for="password">Senha</Label>
        </div>
        <FormGroup className='form-group'>
          <Input
            className='form-input' 
            type={openEye ? 'text' : 'password' }
            onChange={handleChange('password')} 
            invalid={error.password ? true : false} 
          />
          <img src={openEye ? openEyeIcon : closedEyeIcon} alt="closed eye icon" className="eye-icon" onClick={handleShowPassword} />
          <FormFeedback>
          {error.password && '*Campo obrigatório'}
          </FormFeedback>
        </FormGroup>

        <Button className='form-btn' onClick={handleLogin} outline>
          Entrar
        </Button>
      </Form>
    </div>
  );
}

export default Login;