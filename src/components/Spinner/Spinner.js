import { useEffect, useState } from 'react';
import './Spinner.css';
import PopUp from '../PopUp/PopUp';

//ACA ESTA EL SPINNER, Y LOS ERRORES, CON EL POPUP DE ERRORES. 
const Spinner = ({spinner, setSpinner, success, setSuccess, errors, setErrors, functionAfterSuccess, popUpError}) => {
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
        if(popUpError){
          setPopUp(true);
        }
      }, 1500)
    }
  }, [errors])

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
        if(functionAfterSuccess){
          functionAfterSuccess();
        }
      }, 1500)
    }
  }, [success])

  return (
    <>
      {
        spinner ? <div className="form-spinner"><span className='loader'></span></div> : null
      }
      {
        Object.keys(errors).length !== 0 && popUpError ? (
          <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={"Error"} popUpText={Object.values(errors).join(', ')} closeBtn={true} />
        ) : null
      }
    </>
  )
};

export default Spinner;