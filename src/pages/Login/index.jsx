import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap'
import useAuth from '../../hooks/useAuth';
import './login.css';

function Login() {
  const { setAuthData } = useAuth();
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

      setAuthData({
        token: response.token,
        idUser: response.id,
      });

      navigate('/orders', { replace: true });
    } catch (error) {
      //**tratativa de erro no back
      //navigate('/server_internal_error', { replace: true });
    }
  }
  return (
      <Form>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Input valid />
          <FormFeedback valid>
            Mensagem de validação positiva!
          </FormFeedback>
          <FormText>
            exemplo: usuario@usuario.com
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Senha
          </Label>
          <Input invalid />
          <FormFeedback>
            Mensagem de validação negativa!
          </FormFeedback>
          <FormText>
            no mínimo 6 caracteres
          </FormText>
        </FormGroup>

        <FormGroup className="position-relative">
          <Label for="emailRelative">
            Email diferente
          </Label>
          <Input valid />
          <FormFeedback tooltip valid>
            Mensagem positiva em estilo diferente!
          </FormFeedback>
          <FormText>
            exemplo: usuario@usuario.com
          </FormText>
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="passwordRelative">
            Senha diferente
          </Label>
          <Input invalid />
          <FormFeedback tooltip>
          Mensagem negativa em estilo diferente!
          </FormFeedback>
          <FormText>
            no mínimo 6 caracteres
          </FormText>
        </FormGroup>

        <Button>
          Submit
        </Button>
      </Form>
  );
}

export default Login;