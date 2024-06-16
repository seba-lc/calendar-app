import { Button, Table } from 'react-bootstrap';
import './AreasTable.css';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../Spinner/Spinner';
import UserContext from '../../context/Users/UserContext';
import axiosClient from '../../settings/axiosClient';
import postNewArea from '../../helpers/postNewArea';
import PopUp from '../PopUp/PopUp';
import BusinessContext from '../../context/Businesses/BusinessContext';

const AreasTable = ({ areas, setAreas }) => {
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userBusiness } = useContext(UserContext);
  const { postBusinessNewArea, businessAreas } = useContext(BusinessContext);
  const [errors, setErrors] = useState({});
  const [popUp, setPopUp] = useState(false);

  const deleteItem = (itemSelected) => {
    if(spinner){
      return;
    }
    setSpinner(true);
    const index = areas.indexOf(itemSelected);
    const arraySup = areas.concat([]);
    arraySup.splice(index, 1);
    setAreas(arraySup);
    setSuccess(true);
  }

  const submitData = async () => {
    if(spinner){
      return
    }
    if(businessAreas.length !== areas.length){
      setSpinner(true);
      const postingAreaErrors = await postBusinessNewArea(areas, userBusiness);
      if(Object.keys(postingAreaErrors).length !== 0){
        setErrors(postingAreaErrors);
        return;
      }
      setSuccess(true);
    }else{
      console.log('NO ESTOY MODIFICANDO EL ARRAY QUE YA VIENE');
      console.log('NO LO MANDO AL BACKEND');
    }
  }

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
      }, 300)
    }
  }, [success])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setTimeout(() => {
        setSpinner(false);
        setPopUp(true);
      }, 3000)
    }
  }, [errors])

  return (
    <>
      {
        areas.length === 0 ? null : (
          <>
            {
              spinner ? <div className="form-spinner"><Spinner /></div> : null
            }
            <PopUp popUp={popUp} setPopUp={setPopUp} popUpTitle={"Error"} popUpText={Object.values(errors).join(', ')} closeBtn={true} />
            <Table bordered className='areaTable-style mt-3 mb-0'>
              <thead>
                <tr>
                  <th className='text-center'>AREA</th>
                  <th className='text-center w-90'>H.O.</th>
                  <th className='text-center w-90'>1/2 DIAS</th>
                  <th className='text-center w-60'></th>
                </tr>
              </thead>
              <tbody>
                {areas?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.areaName.toUpperCase()}</td>
                    <td className='text-center'>{item.homeOfDays}</td>
                    <td className='text-center'>{item.halfDays}</td>
                    <td className='text-center pointer trash-btn' onClick={() => deleteItem(item)}><FontAwesomeIcon size='sm' icon={faTrash} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant='outline-light' className='submit-style mt-0' onClick={submitData}>ALMACENAR INFORMACION</Button>
          </>
        )
      }
    </>
  );
};

export default AreasTable;