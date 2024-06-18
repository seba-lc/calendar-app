import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/Users/UserContext";
import { newPasswordValidation } from "../../helpers/Validations";
import PopUp from "../PopUp/PopUp";

const NewPasswordForm = () => {
  const [userLog, setUserLog] = useState({
    userPassword: "",
    userPasswordRepeated: ""
  });
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const { postUserNewPassword } = useContext(UserContext);
  let navigate = useNavigate();
  const params = useParams();
  const [popUp, setPopUp] = useState(false);
  const popUpTitle = "Contraseña Almacenada";
  const popUpText = "Gracias por confirmar el Usuario. Ahora podes continuar ingresando datos de los integrantes de tu área.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const newPassError = newPasswordValidation(userLog);
    setErrors(newPassError);
    if(Object.keys(newPassError).length === 0){
      const newPasswordError = await postUserNewPassword(userLog.userPassword, params.user);
      if(Object.keys(newPasswordError).length !== 0){
        setErrors(newPasswordError);
        return;
      }
  
      //EN CASO ESTE TODO BIEN
      setSuccess(true);
    }
  };

  const handleKeyUp = (e) => {
    if(Object.keys(errors).length !== 0){
      setErrors({})
    }
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        document.getElementById("newPassword-form").reset();
        setSpinner(false);
        setSuccess(false);
        setPopUp(true);
      }, 1500)
    }
  }, [success]);

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
      }, 3000)
    }
  }, [errors])

  return (
    <>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={popUpTitle} popUpText={popUpText} popUpBtnFunction={() => navigate('/setusers')} popUpBtnText={"Continuar"} />
      <Form onSubmit={handleSubmit} id="newPassword-form" className="loginForm-style">
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
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresá tu contraseña"
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
          Almacenar Información
        </Button>
      
      </Form>
    </>
  );
};

export default NewPasswordForm;
