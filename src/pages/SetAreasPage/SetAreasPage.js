import { useContext, useEffect, useState } from 'react';
import AreaForm from '../../components/Forms/AreaForm';
import Layout from '../../components/Layout/Layout';
import './SetAreasPage.css';
import AreasTable from '../../components/AreasTable/AreasTable';
import UserContext from '../../context/Users/UserContext';
import Spinner from '../../components/Spinner/Spinner';
import BusinessContext from '../../context/Businesses/BusinessContext';

const SetAreasPage = () => {
  const [areas, setAreas] = useState([]);
  const { getAuth, auth, userData, userBusiness } = useContext(UserContext);
  const { getBusinessAreas, businessAreas } = useContext(BusinessContext);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const prueba = () => {
    console.log(userData);
    console.log(userBusiness);
    console.log(businessAreas);
  }

  useEffect(() => {
    if(!auth){
      getAuth();
    }else{
      getBusinessAreas(userBusiness._id);
    }
  }, [auth])

  useEffect(() => {
    if(success){
      setSpinner(false);
    }
  }, [success])

  useEffect(() => {
    if(businessAreas.length !== 0){
      setAreas(businessAreas);
    }
  }, [businessAreas])

  return (
    <Layout>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }
      <div className='setArea-style'>
        <AreaForm areas={areas} setAreas={setAreas} />
        <AreasTable areas={areas} setAreas={setAreas} />
        <button onClick={prueba}>hola</button>
      </div>
    </Layout>
  );
};

export default SetAreasPage;