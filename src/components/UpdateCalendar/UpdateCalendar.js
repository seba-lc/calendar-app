import { Button, Form } from 'react-bootstrap';
import './UpdateCalendar.css';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import BusinessContext from '../../context/Businesses/BusinessContext';
import PopUp from '../PopUp/PopUp';

const UpdateCalendar = ({areaSelected, dateSelected, data, setData, setDateSelected}) => {
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [popUp, setPopUp] = useState(false);
  const { postCalendarDataPerUserPerMonth } = useContext(BusinessContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return;
    }
    // setSpinner(true);
    // const postDataErrors = await postCalendarDataPerUserPerMonth(data);
    // if(Object.keys(postDataErrors).length !== 0){
    //   setErrors(postDataErrors);
    //   return;
    // }
    // setSuccess(true);

    cleanCalendar();
  }

  const cleanCalendar = () => {
    const itemHalfDayList = [].slice.call(document.getElementsByClassName('halfDay-selected-style'));
    const itemHomeOfList = [].slice.call(document.getElementsByClassName('homeOf-selected-style'));
    for(let i=0; i<itemHalfDayList.length; i++){
      itemHalfDayList[i].classList.remove('halfDay-selected-style');
    }
    for(let i=0; i<itemHomeOfList.length; i++){
      itemHomeOfList[i].classList.remove('homeOf-selected-style')
    }
    setData({
      userEmail: "",
      situation: "",
      halfDaydates: [],
      homeOfdates: [],
      month: "",
      businessAreaId: ""
    })
    document.getElementById('formBasicUserCalendar').value = "";
    document.getElementById('formBasicDaySituationCalendar').value = "";
  }
  

  const handleKeyUp = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if(dateSelected.length !== 0){
      if(data.situation === 'homeOfDay'){
        if(data.homeOfdates.find(date => date === dateSelected.substring(0, 2))){
          const newDates = data.homeOfdates.filter(date => date !== dateSelected.substring(0, 2));
          setData({
            ...data,
            homeOfdates: newDates
          })
        }else{
          setData({
            ...data,
            homeOfdates: data.homeOfdates.concat([dateSelected.substring(0, 2)])
          })
        }
      }
      if(data.situation === 'halfDay'){
        if(data.halfDaydates.find(date => date === dateSelected.substring(0, 2))){
          const newDates = data.halfDaydates.filter(date => date !== dateSelected.substring(0, 2));
          setData({
            ...data,
            halfDaydates: newDates
          })
        }else{
          setData({
            ...data,
            halfDaydates: data.halfDaydates.concat([dateSelected.substring(0, 2)])
          })
        }
      }
      setDateSelected("");
    }
  }, [dateSelected])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
        setPopUp(true);
      }, 1000)
    }
  }, [errors])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
      }, 1000)
    }
  }, [success]);

  return (
    <>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={"Error"} popUpText={Object.values(errors).join(', ')} closeBtn={true} />
      <Form className='ms-3 bg-light px-3' onSubmit={handleSubmit}>
        <Form.Group className="my-3 userBox" controlId="formBasicUserCalendar">
        <Form.Label>Usuario</Form.Label>
          <Form.Select name="userEmail" onChange={handleKeyUp}>
            {
              <>
                <option value="">-- Seleccione un usuario --</option>
                {
                  areaSelected?.accessGrantedEmails?.map((email, index) => (
                    <option value={email} key={index}>{email}</option>
                  ))
                }
              </>
            }
          </Form.Select>
        </Form.Group>
      
        <Form.Group className={`my-3 situationBox ${data.userEmail.length !== 0 ? 'situationBox_active' : null}`} controlId="formBasicDaySituationCalendar">
        <Form.Label>Modo de Trabajo</Form.Label>
          <Form.Select name="situation" onChange={handleKeyUp}>
            <option value="">-- Seleccione un Modo --</option>
            <option value="homeOfDay">Home Office</option>
            <option value="halfDay">Medio Dia</option>
          </Form.Select>
        </Form.Group>
      
        <Form.Group className={`my-3 dateBox ${data.userEmail.length !== 0 && data.situation.length !== 0 ? 'dateBox_active' : null}`} controlId="formBasicHomeOfDateCalendar">
        <Form.Label><span className='fw-bold'>{data.month.length !== 0 ? `Mes: ${data.month}` : ""}</span></Form.Label>
        <br />
        <Form.Label>Fechas Seleccionadas [Home Office]</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            // placeholder={data.date.length !== 0 ? data.date.join(', ') : "Seleccione un Fecha"}
            name="homeOfdates"
            disabled
            className='text-area-input'
            value={data.homeOfdates.length !== 0 ? data.homeOfdates.join(', ') : "Seleccione un Fecha"}
            // style={{height: document.getElementById('formBasicHomeOfDateCalendar')?.scrollHeight+"px"}}
            // style={{height:( (data.date.length/8) > 2 && (data.date.length/8) <= 3  ? "85px" : ( (data.date.length/8) > 3 ? "105px" : null ) )}}
          />
        </Form.Group>
      
        <Form.Group className={`my-3 dateBox ${data.userEmail.length !== 0 && data.situation.length !== 0 ? 'dateBox_active' : null}`} controlId="formBasicHalfDayDateCalendar">
        <Form.Label>Fechas Seleccionadas [Medio Dia]</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="homeOfdates"
            disabled
            className='text-area-input'
            value={data.halfDaydates.length !== 0 ? data.halfDaydates.join(', ') : "Seleccione un Fecha"}
          />
        </Form.Group>
      
        <Button variant="outline-dark" className="w-100 my-3" type="submit">
          Almacenar Datos
        </Button>
      
      </Form>
    </>
  );
};

export default UpdateCalendar;