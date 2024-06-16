import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './ConfirmationEmailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../settings/axiosClient';
import Spinner from '../../components/Spinner/Spinner';
import PopUp from '../../components/PopUp/PopUp';

const ConfirmationEmailPage = () => {
  const params = useParams();
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [popUp, setPopUp] = useState(false);
  const [getOut, setGetOut] = useState(false);
  const popUpTitle = "Usuario Confirmado";
  const popUpText = "Gracias por confirmar el Usuario. Ahora podes continuar ingresando datos de tu Negocio.";
  let navigate = useNavigate();

  const newUserConfirmationFunction = async () => {
    if(spinner){
      return;
    }
    setSpinner(true);
    try {
      const response = await axiosClient.post('/user/emailconfirmation', {user: params.user});
      if(response.status === 200){
        localStorage.setItem('ID', response.data.id);
        setSuccess(true);
      }
    } catch (error) {
      setErrors({
        servidor: 'Error en el Servidor. Intente nuevamente.'
      });
    }
  }

  const handleClick = () => {
    if(spinner){
      return
    }
    setSpinner(true);
    setGetOut(true);
  }

  useEffect(() => {
    newUserConfirmationFunction();
  }, [])

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSuccess(false);
        setSpinner(false);
        setPopUp(true);
      }, 3000)
    }
  }, [success])

  useEffect(() => {
    if(getOut){
      setTimeout(() => {
        setSpinner(false);
        setGetOut(false);
        navigate('/setareas');
      }, 1500)
    }
  }, [getOut])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
        setPopUp(true);
      }, 3000)
    }
  }, [errors])

  return (
    <Layout>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      {
        Object.keys(errors).length === 0 ? (
          <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={popUpTitle} popUpText={popUpText} popUpBtnFunction={handleClick} popUpBtnText={"Continuar"} />
        ) : (
          <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={"Error"} popUpText={Object.values(errors).join(', ')} popUpBtnFunction={() => navigate('/')} popUpBtnText={"Ir al inicio"} />
        )
      }
    </Layout>
  );
};

export default ConfirmationEmailPage;