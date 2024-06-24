import { Table } from 'react-bootstrap';
import './AreaUsersTable.css';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/Users/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BusinessContext from '../../context/Businesses/BusinessContext';
import Spinner from '../Spinner/Spinner';

const AreaUsersTable = ({ businessAreaSelected, userAdded, setUserAdded }) => {
  const [areaEmployees, setAreaEmployees] = useState([]);
  const { userBusiness } = useContext(UserContext);
  const { updateAccessGrantedEmailList } = useContext(BusinessContext);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const setEmployees = () => {
    if(Object.keys(businessAreaSelected).length !== 0){
      const employees = businessAreaSelected.accessGrantedEmails?.filter(email => email !== userBusiness.managerEmail && email !== businessAreaSelected.managerEmail);
      setAreaEmployees(employees);
    }
  }

  const deleteEmployeeFromAreaBusiness = async (employee) => {
    if(spinner){
      return
    }
    setSpinner(true);
    const newEmployeeList = areaEmployees.filter(email => email !== employee);
    const newList = [userBusiness.managerEmail, businessAreaSelected.managerEmail].concat(newEmployeeList);

    const updateErrors = await updateAccessGrantedEmailList(businessAreaSelected._id, newList);
    if(Object.keys(updateErrors).length !== 0){
      setErrors(updateErrors);
      return;
    }
    setUserAdded(true);
    setSuccess(true);
  }
  
  const functionAfterSuccess = () => {
    setUserAdded(false);
  }

  useEffect(() => {
    setEmployees();
  }, [businessAreaSelected, userAdded])

  useEffect(() => {
    if(userAdded){
      setUserAdded(false);
    }
  }, [userAdded])

  return (

    <>
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={true} functionAfterSuccess={functionAfterSuccess} />
      <Table bordered className='areaUsersStable-style mt-2'>
        <tbody>
          {
            Object.keys(businessAreaSelected).length !== 0 ? (
              <>
                <tr>
                  <td className='w-110'>Gerente</td>
                  <td>{userBusiness.managerEmail}</td>
                  <td></td>
                </tr>
                <tr>
                  <td className='w-110'>Jefe Area</td>
                  <td>{businessAreaSelected.managerEmail}</td>
                  <td className='w-35'></td>
                </tr>
              </>
            ) : null
          }
          
          {
            areaEmployees.length !== 0 ? (
              <tr>
                <td className='w-110' rowSpan={areaEmployees.length}>Integrantes</td>
                <td>{areaEmployees[0]}</td>
                <td className='text-center pointer w-35' onClick={() => deleteEmployeeFromAreaBusiness(areaEmployees[0])}><FontAwesomeIcon size='sm' icon={faTrash} /></td>
              </tr>
            ) : null
          }
      
          {
            areaEmployees.length > 1 ? (
              areaEmployees.map((employee, index) => (
                <tr key={index} className={index === 0 ? 'd-none' : ''}>
                  <td>{employee}</td>
                  <td className='text-center pointer w-35' onClick={() => deleteEmployeeFromAreaBusiness(employee)}><FontAwesomeIcon size='sm' icon={faTrash} /></td>
                </tr>
              ))
            ) : null
          }
        </tbody>
      </Table>
    </>
  );
};

export default AreaUsersTable;