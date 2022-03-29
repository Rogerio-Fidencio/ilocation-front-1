import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import useAuth from '../../hooks/useAuth';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
import pinIcon from '../../assets/ilocation-logo.svg';
import './login.css';

function Login() {
  //const { setAuthData } = useAuth();
  const [ user, setUser ] = useState({ email: '', password: ''});
  const [ error, setError ] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  //[inputs controlados] guardando o que o usuário digitar
  const handleChange = (prop) => event => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleLogin = async(event) => {
    event.preventDefault();

    if (!user.email || !user.password) {
      if (!user.email) {
        setError({ email: '*Campo obrigatório', password: '' });
      }
      if (!user.password) {
        setError({ email: '', password: '*Campo obrigatório' });
      }
      if (!user.email && !user.password) {
        setError({ email: '*Campo obrigatório', password: '*Campo obrigatório' });
      }
      return;
    }

    const input = user.email.replace(' ', '');

    if (Number(input)) {
      if (input.length !== 11) {
        setError({ email: '*Formato inválido', password: '' });
        return;
      }

      setUser({ ...user, email: input });
    }

    setError({ email: '', password: '' });
    
    // const userData = { ...user }; //para mandar pro back

    // try {
    //   const request = await fetch('https://ilocation.herokuapp.com/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    //   });

    //   const response = await request.json();

    //   //**tratamento do response **

    //   setAuthData({
    //     token: response.token,
    //   });

    navigate('/orders', { replace: true });
    // } catch (error) {
    //   //navigate('/server_internal_error', { replace: true });
    // }
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
            onChange={handleChange('email')} 
            invalid={error.email} 
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
            type='password'
            onChange={handleChange('password')} 
            invalid={error.password} 
          />
          <FormFeedback>
          {error.password && '*Campo obrigatório'}
          </FormFeedback>
        </FormGroup>

          {/* <FormGroup className="position-relative">
            <FormFeedback tooltip valid>
              Mensagem positiva em estilo diferente!
            </FormFeedback>
            <FormText>exemplo: usuario@usuario.com</FormText>
          </FormGroup> */}

        <Button className='form-btn' onClick={handleLogin} outline>
          Entrar
        </Button>
      </Form>
    </div>
  );
}

export default Login;