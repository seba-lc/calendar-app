import React, { useContext, useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import './CalendarPage.css';
import logoImg from './../../assets/Consulting.png'
import LegendBox from '../../components/LegendBox/LegendBox';
import UserContext from '../../context/Users/UserContext';
import BusinessContext from '../../context/Businesses/BusinessContext';
import Layout from '../../components/Layout/Layout';
import UpdateCalendar from '../../components/UpdateCalendar/UpdateCalendar';

const CalendarPage = () => {
  const { getAuth, auth, userBusiness, userData } = useContext(UserContext);
  const { businessAreas, getUserBusinessAreas, calendarDataPerBusinessArea, getCalendarDataPerBusinessArea } = useContext(BusinessContext);
  const [areaSelected, setAreaSelected] = useState({});
  const [dateSelected, setDateSelected] = useState("");
  const [data, setData] = useState({
    userEmail: "",
    situation: "",
    halfDaydates: [],
    homeOfdates: [],
    month: "",
    businessAreaId: ""
  })

  const handleClick = (e) => {
    if(data.userEmail.length !== 0 && data.situation.length !== 0){
      if(data.month.length === 0){
        setData({
          ...data,
          month: e.target.id.substring(3)
        })
      }
      setDateSelected(e.target.id);
    }
    if(data.situation === 'homeOfDay' && e.target.id.length !== 0){
      if(e.target.classList.contains('homeOf-selected-style')){
        e.target.classList.remove('homeOf-selected-style')
      }else{
        e.target.classList.add('homeOf-selected-style')
      }
    }
    if(data.situation === 'halfDay' && e.target.id.length !== 0){
      if(e.target.classList.contains('halfDay-selected-style')){
        e.target.classList.remove('halfDay-selected-style')
      }else{
        e.target.classList.add('halfDay-selected-style')
      }
    }
  }

  const prueba = () => {
    // console.log(userData);
    // console.log(userBusiness);
    // console.log(areas);
    console.log(businessAreas);
    console.log(calendarDataPerBusinessArea);
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
    if(businessAreas.length === 1 && Object.keys(areaSelected).length === 0){
      setAreaSelected(businessAreas[0]);
    }
    if(businessAreas.length !== 0 && calendarDataPerBusinessArea.length === 0){
      for(let i=0; i<businessAreas.length; i++){
        getCalendarDataPerBusinessArea(businessAreas[i]._id);
      }
    }
  }, [businessAreas])

  useEffect(() => {
    if(Object.keys(areaSelected).length !== 0){
      setData({
        ...data,
        businessAreaId: areaSelected._id
      })
    }
  }, [areaSelected])

  return (
    <Layout>
      {
        businessAreas?.length > 1 ? (
          <div className='d-flex border mt-3'>
            {
              businessAreas.map((area, index) => (
                <div className='mx-1 pointer border' onClick={() => setAreaSelected(area)} key={index}>{area.areaName}</div>
              ))
            }
          </div>
        ) : null
      }
      <div className='calendarPage-style'>
        <div className='logo-style'><img src={logoImg} className='ms-4' width={150} alt="" /></div>
        <Calendar handleClick={handleClick} />
        {/* <LegendBox legendItemSize={'18px'} /> */}
        <UpdateCalendar areaSelected={areaSelected} dateSelected={dateSelected} data={data} setData={setData} setDateSelected={setDateSelected} />
      </div>
      <button onClick={prueba}>DATA</button>
    </Layout>
  );
};

export default CalendarPage;