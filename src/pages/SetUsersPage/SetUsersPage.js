import NewAreaUserForm from '../../components/Forms/NewAreaUserForm';
import './SetUsersPage.css';
import logoImg from './../../assets/Consulting.png';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/Users/UserContext';
import BusinessContext from '../../context/Businesses/BusinessContext';
import Layout from '../../components/Layout/Layout';
import AreaUsersTable from '../../components/AreaUsersTable/AreaUsersTable';

const SetUsersPage = () => {
  const { auth, getAuth, userData, userBusiness } = useContext(UserContext);
  const { businessAreas, getUserBusinessAreas } = useContext(BusinessContext);
  const [areaSelected, setAreaSelected] = useState({});
  const [areaSelectedId, setAreaSelectedId] = useState('');
  const [userAdded, setUserAdded] = useState(false);

  const prueba = () => {
    console.log(userData);
    console.log(userBusiness);
    console.log(businessAreas);
  }

  useEffect(() => {
    if(!auth){
      getAuth();
    }else{
      if(businessAreas.length === 0){
        getUserBusinessAreas(userBusiness._id, userData.userEmail);
      }
    }
  }, [auth])

  useEffect(() => {
    if(areaSelectedId.length !== 0){
      const area = businessAreas.find(item => item._id === areaSelectedId);
      setAreaSelected(area);
    }
  }, [areaSelectedId, businessAreas, userAdded])

  return (
    <Layout>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={200} alt="" /></div>
      <NewAreaUserForm setAreaSelectedId={setAreaSelectedId} setUserAdded={setUserAdded} />
      <button onClick={prueba}>DATA</button>
      <AreaUsersTable businessAreaSelected={areaSelected} userAdded={userAdded} setUserAdded={setUserAdded} />
    </Layout>
  );
};

export default SetUsersPage;