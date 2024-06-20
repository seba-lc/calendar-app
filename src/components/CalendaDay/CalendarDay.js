import { useContext, useEffect, useState } from 'react';
import LegendItem from '../LegendBox/LegendItem';
import './CalendarDay.css';
import BusinessContext from '../../context/Businesses/BusinessContext';
import LegendItem2 from '../LegendBox/LegendItem2';

const CalendarDay = ({day, usersData, year, month, parentId}) => {
  const { calendarDataPerBusinessArea } = useContext(BusinessContext);
  const [halfDayBoolean, setHalfDayBoolean] = useState(false);
  const [homeOfDayBoolean, setHomeOfDayBoolean] = useState(false);
  const [homeOfUsers, setHomeOfUsers] = useState([]);
  const [halfDayUsers, setHalfDayUsers] = useState([]);

  const defineUsersData = () => {
    let homeOfList = [];
    let halfDayList = [];
    calendarDataPerBusinessArea.forEach((item) => {
      if(item.homeOfdates.includes(day.toString().length === 1 ? '0'+day : day.toString())){
        setHomeOfDayBoolean(true);
        homeOfList.push(item.userEmail)
      }
      if(item.halfDaydates.includes(day.toString().length === 1 ? '0'+day : day.toString())){
        setHalfDayBoolean(true);
        halfDayList.push(item.userEmail)
      }
    })
    setHalfDayUsers(halfDayList);
    setHomeOfUsers(homeOfList);
  }

  const checkUsersList = () => {
    console.log("MEDIO DIA");
    console.log(halfDayUsers);
    console.log("HOME OFFICE");
    console.log(homeOfUsers);
  }

  useEffect(() => {
    if(calendarDataPerBusinessArea.length !== 0){
      defineUsersData();
    }
  }, [calendarDataPerBusinessArea])

  return (
    <div className='calendarDay-style border border-dark'>
      <span>{day}</span>
      <div className='border w-100 d-flex justify-content-center align-items-center flex-wrap' onClick={homeOfDayBoolean || halfDayBoolean ? () => checkUsersList() : null}>
        {
          homeOfDayBoolean ? <LegendItem className="ms-1 my-1" size={'8px'} bg={'bg-1'} homeOffice={true} halfDay={false} /> : null
        }
        {
          halfDayBoolean ? <LegendItem className="ms-1 my-1" size={'8px'} bg={'bg-5'} homeOffice={false} halfDay={false} /> : null
        }
        {/* <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} />
        <LegendItem className="ms-1 my-1" size={'5px'} bg={'bg-1'} homeOffice={false} halfDay={false} /> */}
      </div>
    </div>
  );
};

export default CalendarDay;