import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";
import axiosClient from "../../settings/axiosClient";
import { businessRegisterValidations } from "../../helpers/Validations";
import PopUp from "../PopUp/PopUp";

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
  const [popUp, setPopUp] = useState(false);
  const popUpText = "Para poder continuar con el proceso, por favor revisa tu casilla de Email."

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const registerDataErrors = businessRegisterValidations(userLog);
    setErrors(registerDataErrors);
    if(Object.keys(registerDataErrors).length === 0){
      try {
        const response = await axiosClient.post('/business', userLog);
        if(response.status === 200){
          setSuccess(true);
          console.log(response.data);
        }
      } catch (error) {
        setErrors({server: 'Error en el Servidor, inténtelo nuevamente.'})
      }
    }
  };

  const handleKeyUp = (e) => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  const popUpFunction = () => {
    formRequired();
    setPopUp(false);
  }

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
    if(success) {
      setTimeout(() => {
        setSuccess(false);
        setSpinner(false);
        setPopUp(true);
      }, 2000)
    }
  }, [success]);

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
      }, 300)
    }
  }, [errors])

  return (
    <>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={"Bienvenido"} popUpText={popUpText} popUpBtnFunction={popUpFunction} popUpBtnText={"Continuar"} />
      <Form onSubmit={handleSubmit} id="register-form" className={`registerForm-style ${newUserBoolean ? 'registerForm_active' : 'registerForm_inactive'} ${popUp ? 'd-none' : null}`}>
      
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
              <div className="border border-danger w-100 text-danger text-center mb-2" key={index}>{error}</div>
            ))
          : null}
      
        <Button variant="dark" className="w-100 my-3" type="submit">
          Registrarme
        </Button>
      
        <div className="text-center pointer" onClick={formRequired}><u>Ya estoy Registrado</u></div>
      
      </Form>
    </>
  );
};

export default RegisterForm;