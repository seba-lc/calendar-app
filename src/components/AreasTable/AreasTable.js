import { Button, Table } from 'react-bootstrap';
import './AreasTable.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../Spinner/Spinner';

const AreasTable = ({ areas, setAreas }) => {
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = (itemSelected) => {
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

  const submitData = () => {
    console.log(areas);
  }

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
      }, 300)
    }
  }, [success])

  return (
    <>
      {
        areas.length === 0 ? null : (
          <>
            {
              spinner ? <div className="form-spinner"><Spinner /></div> : null
            }
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
                    <td className='text-center pointer trash-btn' onClick={() => handleClick(item)}><FontAwesomeIcon size='sm' icon={faTrash} /></td>
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