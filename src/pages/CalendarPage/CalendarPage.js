import React, { useContext, useEffect } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import './CalendarPage.css';
import logoImg from './../../assets/Consulting.png'
import LegendBox from '../../components/LegendBox/LegendBox';
import UserContext from '../../context/Users/UserContext';
import BusinessContext from '../../context/Businesses/BusinessContext';

const CalendarPage = () => {
  const { getAuth, auth, userBusiness, userData } = useContext(UserContext);
  const { businessAreas, getUserBusinessAreas } = useContext(BusinessContext);

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  const prueba = () => {
    console.log(userData);
    console.log(userBusiness);
    // console.log(areas);
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

  return (
    <div className='calendarPage-style'>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={150} alt="" /></div>
      <Calendar handleClick={handleClick} />
      <LegendBox legendItemSize={'18px'} />
      <button onClick={prueba}>DATA</button>
    </div>
  );
};

export default CalendarPage;