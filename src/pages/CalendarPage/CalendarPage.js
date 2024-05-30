import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import './CalendarPage.css';

const CalendarPage = () => {

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  return (
    <div className='calendarPage-style'>
      <Calendar handleClick={handleClick} />
    </div>
  );
};

export default CalendarPage;