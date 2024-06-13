import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";

const RegisterForm = ({ newUserBoolean, setNewUserBoolean }) => {
  const [userLog, setUserLog] = useState({
    businessName: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    userPasswordRepeated: ""
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
    console.log('Registro Negocio y envío email de confirmación');

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
      businessName: "",
      userName: "",
      userEmail: "",
      userPassword: "",
      userPasswordRepeated: ""
    })
    document.getElementById('register-form').reset();
    setNewUserBoolean(false);
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
    <Form onSubmit={handleSubmit} id="register-form" className={`registerForm-style ${newUserBoolean ? 'registerForm_active' : 'registerForm_inactive'}`}>

      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }

      <Form.Group className="my-3" controlId="formBasicBusinessName">
        <Form.Label>Nombre del Negocio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresá el nombre de tu Negocio"
          onKeyUp={handleKeyUp}
          name="businessName"
          maxLength={50}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresá tu nombre"
          onKeyUp={handleKeyUp}
          name="userName"
          maxLength={50}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresá un email de Contacto"
          onKeyUp={handleKeyUp}
          name="userEmail"
          maxLength={50}
        />
        <Form.Text className="text-muted">
          No compartiremos tu dirección de email con nadie.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingresá tu contraseña"
          onKeyUp={handleKeyUp}
          name="userPassword"
          maxLength={40}
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPasswordRepeated">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repetí la contraseña"
          onKeyUp={handleKeyUp}
          name="userPasswordRepeated"
          maxLength={40}
        />
      </Form.Group>

      {Object.keys(errors).length !== 0
        ? Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))
        : null}

      <Button variant="dark" className="w-100 my-3" type="submit">
        Registrarme
      </Button>

      <div className="text-center pointer" onClick={formRequired}><u>Ya estoy Registrado</u></div>

    </Form>
  );
};

export default RegisterForm;