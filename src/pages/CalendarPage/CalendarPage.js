import React, { useContext, useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import './CalendarPage.css';
import logoImg from './../../assets/Consulting.png'
import UserContext from '../../context/Users/UserContext';
import BusinessContext from '../../context/Businesses/BusinessContext';
import Layout from '../../components/Layout/Layout';
import UpdateCalendar from '../../components/UpdateCalendar/UpdateCalendar';
import cleanPaintedDays from '../../helpers/cleanPaintedDays';
import Spinner from '../../components/Spinner/Spinner';

const CalendarPage = () => {
  const { getAuth, auth, userBusiness, userData } = useContext(UserContext);
  const { businessAreas, getUserBusinessAreas, calendarDataPerBusinessArea, getCalendarDataPerBusinessArea, calendarData } = useContext(BusinessContext);
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
  const [updateDataActive, setUpdateDataActive] = useState(false);
  const [month, setMonth] = useState((new Date()).getMonth());
  const [year, setYear] = useState((new Date()).getFullYear());
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClick = (e) => {
    if(data.userEmail.length !== 0 && data.situation.length !== 0){
      setDateSelected(e.target.id);
    }
    
  }

  const pickArea = (area) => {
    if(spinner){
      return
    }
    setSpinner(true);
    setAreaSelected(area);
    setData({
      ...data,
      businessAreaId: area._id
    })
    setUpdateDataActive(false);
    setSuccess(true);
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
    }
  }, [auth])

  useEffect(() => {
    if(businessAreas.length === 1 && Object.keys(areaSelected).length === 0){
      setAreaSelected(businessAreas[0]);
    }
  }, [businessAreas])

  useEffect(() => {
    if(Object.keys(areaSelected).length !== 0){
      setData({
        ...data,
        businessAreaId: areaSelected._id
      })
      getCalendarDataPerBusinessArea(areaSelected._id)
    }
  }, [areaSelected])

  useEffect(() => {
    if(!updateDataActive){
      setData({
        ...data,
        userEmail: "",
        situation: "",
        halfDaydates: [],
        homeOfdates: []
      })
      cleanPaintedDays();
      document.getElementById('formBasicUserCalendar').value = "";
      document.getElementById('formBasicDaySituationCalendar').value = "";
    }
  }, [updateDataActive])

  useEffect(() => {
    const monthString =  month.toString().length === 1 ? '0'+(month+1) : (month+1).toString();
    setData({
      ...data,
      month: `${monthString}-${year.toString()}`
    })
    setUpdateDataActive(false);
  }, [month])

  return (
    <Layout>
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={false} />
      {
        businessAreas?.length > 1 ? (
          <div className='d-flex mt-3 tab-container'>
            {
              businessAreas.map((area, index) => (
                <div className={`mx-1 pointer tab ${areaSelected === area ? 'tab_active' : null}`} onClick={() => pickArea(area)} key={index}>{area.areaName}</div>
              ))
            }
          </div>
        ) : null
      }
      <div className='calendarPage-style'>
        <div className='logo-style'><img src={logoImg} className='ms-4' width={150} alt="" /></div>
        <Calendar handleClick={handleClick} updateDataActive={updateDataActive} month={month} setMonth={setMonth} year={year} setYear={setYear} />
        <UpdateCalendar month={month} year={year} areaSelected={areaSelected} dateSelected={dateSelected} data={data} setData={setData} setDateSelected={setDateSelected} updateDataActive={updateDataActive} setUpdateDataActive={setUpdateDataActive} />
      </div>
      <button onClick={prueba}>DATA</button>
    </Layout>
  );
};

export default CalendarPage;