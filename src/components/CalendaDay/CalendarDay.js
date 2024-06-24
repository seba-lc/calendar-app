import { useContext, useEffect, useState } from 'react';
import LegendItem from '../LegendBox/LegendItem';
import './CalendarDay.css';
import BusinessContext from '../../context/Businesses/BusinessContext';

const CalendarDay = ({day, year, month, updateDataActive}) => {
  const { calendarData } = useContext(BusinessContext);
  const [halfDayBoolean, setHalfDayBoolean] = useState(false);
  const [homeOfDayBoolean, setHomeOfDayBoolean] = useState(false);
  const [homeOfUsers, setHomeOfUsers] = useState([]);
  const [halfDayUsers, setHalfDayUsers] = useState([]);

  const checkDayData = () => {
    const dayString = day.toString().length === 1 ? '0'+day : day.toString();
    const monthString = month.toString().length === 1 ? '0'+(month+1) : (month+1).toString();
    const dayData = calendarData.filter(item => item.date === `${dayString}-${monthString}-${year.toString()}`);
    if(dayData.length !== 0){
      dayData.forEach(item => {
        if(item.workMood === "halfDay"){
          setHalfDayBoolean(true);
          setHalfDayUsers(item.users);
        }
        if(item.workMood === "homeOfDay"){
          setHomeOfDayBoolean(true);
          setHomeOfUsers(item.users);
        }
      })
    }else{
      setHalfDayBoolean(false);
      setHalfDayUsers([]);
      setHomeOfDayBoolean(false);
      setHomeOfUsers([]);
    }
  }

  const checkUsersList = () => {
    console.log("MEDIO DIA");
    console.log(halfDayUsers);
    console.log("HOME OFFICE");
    console.log(homeOfUsers);
  }

  useEffect(() => {
    checkDayData();
  }, [calendarData, month, year])

  return (
    <div className='calendarDay-style border border-dark'>
      <span>{day}</span>
      <div className={`w-100 d-flex justify-content-center align-items-center flex-wrap ${!updateDataActive ? "pointer day-hover" : null}`} onClick={!updateDataActive ? () => checkUsersList() : null}>
        {
          homeOfDayBoolean ? <LegendItem className="ms-1 my-1" size={'8px'} bg={'bg-1'} homeOffice={true} halfDay={false} /> : null
        }
        {
          halfDayBoolean ? <LegendItem className="ms-1 my-1" size={'8px'} bg={'bg-5'} homeOffice={false} halfDay={false} /> : null
        }
      </div>
    </div>
  );
};

export default CalendarDay;