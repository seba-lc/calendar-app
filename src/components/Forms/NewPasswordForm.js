import { useContext, useState } from "react";
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
  const { postUserNewPassword, adminKey } = useContext(UserContext);
  let navigate = useNavigate();
  const params = useParams();
  const [popUp, setPopUp] = useState(false);
  const popUpTitle = "Contraseña Almacenada";
  const popUpText = adminKey ? "Gracias por confirmar el Usuario. Ahora podes continuar ingresando datos de los integrantes de tu área." : "Gracias por Unirte a Calendar.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const newPassError = newPasswordValidation(userLog);
    if(Object.keys(newPassError).length !== 0){
      setErrors(newPassError);
      return;
    }
    const newPasswordError = await postUserNewPassword(userLog.userPassword, params.user);
    if(Object.keys(newPasswordError).length !== 0){
      setErrors(newPasswordError);
      return;
    }
    setSuccess(true);
  };

  const handleKeyUp = (e) => {
    if(Object.keys(errors).length !== 0 && e.keyCode !== 13){
      setErrors({})
    }
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  const popFunction = () => {
    if(adminKey){
      navigate('/setusers');
    }else{
      navigate('/calendar')
    }
  }

  const functionAfterSuccess = () => {
    document.getElementById("newPassword-form").reset();
    setPopUp(true);
  }

  return (
    <>
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={false} functionAfterSuccess={functionAfterSuccess} />
      <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={popUpTitle} popUpText={popUpText} popUpBtnFunction={popFunction} popUpBtnText={"Continuar"} />
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
