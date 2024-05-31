import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";

const LoginForm = ({ newUser, setNewUser }) => {
  const [userLog, setUserLog] = useState({
    userEmail: "",
    userPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    console.log(userLog);

    //EN CASO ESTE TODO BIEN
    setSuccess(true);
  };

  const handleKeyUp = (e) => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  const formRequired = () => {
    setUserLog({
      userEmail: "",
      userPassword: ""
    })
    document.getElementById('login-form').reset();
    setNewUser(true)
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
      }, 1500)
    }
  }, [success]);

  return (
    <Form onSubmit={handleSubmit} id="login-form" className={`loginForm-style ${newUser ? 'loginForm_inactive' : 'loginForm_active'}`}>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      <Form.Group className="my-3" controlId="formBasicEmailLogin">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresá tu email"
          onKeyUp={handleKeyUp}
          name="userEmail"
          maxLength={50}
        />
        <Form.Text className="text-muted">
          No compartiremos tu dirección de email con nadie.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordLogin">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingresá tu contraseña"
          onKeyUp={handleKeyUp}
          name="userPassword"
          maxLength={40}
        />
      </Form.Group>

      {Object.keys(errors).length !== 0
        ? Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))
        : null}

      <Button variant="dark" className="w-100 my-3" type="submit">
        Iniciar Sesión
      </Button>

      <div className="text-center pointer" onClick={formRequired}><u>¿No tenés Usuario? REGISTRATE</u></div>

    </Form>
  );
};

export default LoginForm;
