import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/Users/UserContext";

const LoginForm = ({ newUserBoolean, setNewUserBoolean }) => {
  const [userLog, setUserLog] = useState({
    userEmail: "",
    userPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const { getUserByEmail } = useContext(UserContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const loginError = await getUserByEmail(userLog);
    if(Object.keys(loginError).length !== 0){
      setErrors(loginError);
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

  const formRequired = () => {
    setUserLog({
      userEmail: "",
      userPassword: ""
    })
    document.getElementById('login-form').reset();
    setNewUserBoolean(true)
  }

  return (
    <>
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={false} functionAfterSuccess={() => navigate('/calendar')} />
      <Form onSubmit={handleSubmit} id="login-form" className={`loginForm-style ${newUserBoolean ? 'loginForm_inactive' : 'loginForm_active'}`}>
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
              <div className="border border-danger w-100 text-danger text-center mb-2" key={index}>{error}</div>
            ))
          : null}
      
        <Button variant="dark" className="w-100 my-3" type="submit">
          Iniciar Sesión
        </Button>
      
        <div className="text-center pointer" onClick={formRequired}><u>¿Querés registrar tu Negocio? <FontAwesomeIcon icon={faHandPointer} /></u></div>
      
      </Form>
    </>
  );
};

export default LoginForm;
