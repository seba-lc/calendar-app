import { useEffect } from 'react';
import LegendItem from '../LegendBox/LegendItem';
import './CalendarDay.css';

const CalendarDay = ({day, usersData, year, month}) => {

  const defineUsersWithHomeOffice = () => {
    //ACA TENGO QUE OBTENER LOS USUARIOS QUE TIENEN HOME OFFICE ESTE DIA EN PARTICULAR
  }

  const defineUsersWithHalfDay = () => {
    //ACA TENGO QUE OBTENER LOS USUARIOS QUE TIENEN MEDIO DIA ESTE DIA EN PARTICULAR
  }

  useEffect(() => {
    defineUsersWithHomeOffice();
    defineUsersWithHalfDay();
  }, [])

  return (
    <div className='calendarDay-style'>
      <span>{day}</span>
      <div className='border w-100 d-flex justify-content-center align-items-center flex-wrap'>
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