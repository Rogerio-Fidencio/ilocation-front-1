import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import useAuth from '../../hooks/useAuth';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
//import pinIcon from '../../assets/ilocation-logo.svg';
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

    setError({ password: '', email: '' });
    
    // const userData = {}; //para mandar pro back

    // try {
    //   const request = await fetch('endpoint de login', {
    //     method: 'metodo do endpoint',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData)
    //   });

    //   const response = await request.json();

    //   //**tratamento do response **

    //   setAuthData({
    //     token: response.token,
    //     idUser: response.id,
    //   });

    navigate('/orders', { replace: true });
    // } catch (error) {
    //   //navigate('/server_internal_error', { replace: true });
    // }
  };

  return (
    <>
      {/* <header>
        iLocati
        <img className="pin-icon" src={pinIcon} alt="pin map icon" />
        n
      </header> */}
      <Form className='form'>
        <FormGroup className='form-group'>
          <Label className='form-label' for="email">Email</Label>
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
        <FormGroup className='form-group'>
          <Label className='form-label' for="password">Senha</Label>
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

        <Button className='form-btn' onClick={handleLogin} color='danger' outline>
          Entrar
        </Button>
      </Form>
    </>
  );
}

export default Login;