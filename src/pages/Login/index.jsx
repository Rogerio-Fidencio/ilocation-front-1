import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import './login.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import { Button } from 'reactstrap';

function Login() {
  // const { setAuthData } = useAuth();
  const [ user, setUser ] = useState({ email: '', password: ''});
  const navigate = useNavigate();
  
  //[inputs controlados] guardando o que o usuário digitar
  const handleChange = (prop) => event => {
    setUser({ ...user, [prop]: event.target.value });
  }

  const handleLogin = async(event) => {
    event.preventDefault();

    //** validação básica de usuário **
    
    const userData = {}; //para mandar pro back

    try {
      const request = await fetch('endpoint de login', {
        method: 'metodo do endpoint',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const response = await request.json();

      //**tratamento do response **

      // setAuthData({
        // token: response.token,
        // idUser: response.id,
      // });

      navigate('/orders', { replace: true });
    } catch (error) {
      //**tratativa de erro no back
      //navigate('/server_internal_error', { replace: true });
    }
  }
  return (
    <>
      <Form>
      <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
     </>
  );
}

export default Login;