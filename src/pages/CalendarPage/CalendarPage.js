import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import './CalendarPage.css';
import logoImg from './../../assets/Consulting.png'
import LegendBox from '../../components/LegendBox/LegendBox';

const CalendarPage = () => {
  //DB DATA
  const usersData = [
    {
      userName: 'Juan',
      userEmail: 'juan@gmail.com',
      halfDaysPerYear: [
        {
          year: '2024',
          halfDays: [[],[],[],[],[],[14,28],[],[],[],[],[],[]]
        }
      ],
      homeOfficeDaysPerYear: [
        {
          year: '2024',
          homeOfficeDays: [[],[],[],[],[],[10,11,17,18],[],[],[],[],[],[]]
        }
      ],
      color: 'bg-1' //unique
    }
  ]
  //-- FIN DB DATA

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  return (
    <div className='calendarPage-style'>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={150} alt="" /></div>
      <Calendar handleClick={handleClick} usersData={usersData} />
      <LegendBox legendItemSize={'18px'} />
    </div>
  );
};

export default CalendarPage;