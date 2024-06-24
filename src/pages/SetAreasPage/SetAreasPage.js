import { useContext, useEffect, useState } from 'react';
import AreaForm from '../../components/Forms/AreaForm';
import Layout from '../../components/Layout/Layout';
import './SetAreasPage.css';
import AreasTable from '../../components/AreasTable/AreasTable';
import UserContext from '../../context/Users/UserContext';
import BusinessContext from '../../context/Businesses/BusinessContext';

const SetAreasPage = () => {
  const [areas, setAreas] = useState([]);
  const { getAuth, auth } = useContext(UserContext);
  const { businessAreas } = useContext(BusinessContext);

  useEffect(() => {
    if(!auth){
      getAuth();
    }
  }, [auth])

  useEffect(() => {
    if(businessAreas.length !== 0){
      setAreas(businessAreas);
    }
  }, [businessAreas])

  return (
    <Layout>
      <div className='setArea-style'>
        <AreaForm areas={areas} setAreas={setAreas} />
        <AreasTable areas={areas} setAreas={setAreas} />
      </div>
    </Layout>
  );
};

export default SetAreasPage;