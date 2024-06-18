import { Table } from 'react-bootstrap';
import './AreaUsersTable.css';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/Users/UserContext';

const AreaUsersTable = ({ businessAreaSelected, userAdded, setUserAdded }) => {
  const [areaEmployees, setAreaEmployees] = useState([]);
  const { userBusiness } = useContext(UserContext);

  const setEmployees = () => {
    if(Object.keys(businessAreaSelected).length !== 0){
      const employees = businessAreaSelected.accessGrantedEmails?.filter(email => email !== userBusiness.managerEmail && email !== businessAreaSelected.managerEmail);
      setAreaEmployees(employees);
    }
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
    <Table bordered className='areaUsersStable-style mt-2'>
      <tbody>
        {
          Object.keys(businessAreaSelected).length !== 0 ? (
            <>
              <tr>
                <td className='w-110'>Gerente</td>
                <td>{userBusiness.managerEmail}</td>
              </tr>
              <tr>
                <td className='w-110'>Jefe Area</td>
                <td>{businessAreaSelected.managerEmail}</td>
              </tr>
            </>
          ) : null
        }
        
        {
          areaEmployees.length !== 0 ? (
            <tr>
              <td className='w-110' rowSpan={areaEmployees.length}>Integrantes</td>
              <td>{areaEmployees[0]}</td>
            </tr>
          ) : null
        }

        {/* TENGO QUE AGREGAR EL RESTO DE LOS EMPLOYEES */}
        {
          areaEmployees.length > 1 ? (
            areaEmployees.map((employee, index) => (
              <tr key={index} className={index === 0 ? 'd-none' : ''}>
                <td>{employee}</td>
              </tr>
            ))
          ) : null
        }
      </tbody>
    </Table>
  );
};

export default AreaUsersTable;