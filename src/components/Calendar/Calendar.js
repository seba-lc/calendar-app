import { useEffect, useState } from "react";
import "./Calendar.css";
import LegendItem from "../LegendBox/LegendItem";
import CalendarDay from "../CalendaDay/CalendarDay";

const Calendar = ({handleClick, usersData}) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [month, setMonth] = useState((new Date()).getMonth());
  const [year, setYear] = useState((new Date()).getFullYear());
  const [monthCalendar, setMonthCalendar] = useState({});
  const [beforeInactiveDays, setBeforeInactiveDays] = useState([]);
  const [afterInactiveDays, setAfterInactiveDays] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  const monthDates = (year, month) => { //me modifica el estado monthCalendar
    setMonthCalendar({
      start: new Date(year, month, 1).getDay(), //Primer dia del mes (mie=3)
      endDate: new Date(year, month + 1, 0).getDate(),//Ultimo dia del mes (31)
      end: new Date(year, month, (new Date(year, month + 1, 0).getDate())).getDay(),//Dia de la semana del ultimo dia del mes (vie=5)
      endDatePrev: new Date(year, month, 0).getDate()//Ultimo dia del mes anterior (30)
    })
  }

  const getMonthArrays = () => {
    let beforeInactiveDaysSup = [];
    for(let i=monthCalendar.start; i>0; i--){
      beforeInactiveDaysSup.push(monthCalendar.endDatePrev - i + 1)
    }
    setBeforeInactiveDays(beforeInactiveDaysSup);

    let activeDaysSup = [];
    for(let i=1; i <= monthCalendar.endDate; i++){
      activeDaysSup.push(i);
    }
    setActiveDays(activeDaysSup);

    let afterInactiveDaysSup = [];
    for(let i=monthCalendar.end; i<6; i++){
      afterInactiveDaysSup.push(i - monthCalendar.end + 1);
    }
    if((beforeInactiveDaysSup.length+activeDaysSup.length+afterInactiveDaysSup.length)/7 <= 5){
      const supposedLastDaySup = afterInactiveDaysSup[afterInactiveDaysSup.length-1];
      const supposedLastDay = supposedLastDaySup === undefined ? 0 : supposedLastDaySup;
      for(let i=supposedLastDay+1; i<supposedLastDay+8; i++){
        afterInactiveDaysSup.push(i)
      }
    }
    setAfterInactiveDays(afterInactiveDaysSup);
  }

  const changeMonthButton = (e) => {
    const btnId = e.target.id;
    if(btnId === "prev"){
      if(month === 0) {
        setYear(year-1);
        setMonth(11);
      }else{
        setMonth(month-1);
      }
    } else if(btnId === "next"){
      if(month === 11){
        setYear(year+1);
        setMonth(0);
      }else{
        setMonth(month+1);
      }
    }
  };

  useEffect(() => {
    monthDates(year, month); //me modifica el month array
  }, [year, month])

  useEffect(() => {
    getMonthArrays();
  }, [monthCalendar])

  return (
    <div className="calendar">
      <header>
        <h3>{`${months[month]} ${year}`}</h3>
        <nav>
          <button id="prev" onClick={changeMonthButton}></button>
          <button id="next" onClick={changeMonthButton}></button>
        </nav>
      </header>
      <section>
        <ul className="days">
          <li>Dom</li>
          <li>Lun</li>
          <li>Mar</li>
          <li>Mie</li>
          <li>Jue</li>
          <li>Vie</li>
          <li>Sab</li>
        </ul>
        <ul>
          {
            beforeInactiveDays?.map((item, index) => <li key={index} className="pointer inactive days_border">{item}</li>)
          }
          {
            activeDays?.map((item, index) => (
              <li 
              key={index} 
              className={`pointer days_border ${item.toString() === new Date().getDate().toString() ? (
                new Date().getMonth().toString() === month.toString() ? (
                  new Date().getFullYear().toString() === year.toString() ? 'today' : null
                ) : null
              ) : null}`}
              id={`${item.toString().length < 2 ? '0'+item.toString() : item}-${(month+1).toString().length < 2 ? '0'+(month+1).toString() : (month+1)}-${year}`} 
              onClick={handleClick}>
                <CalendarDay day={item} usersData={usersData} month={month} year={year} />
              </li>
            ))
          }
          {
            afterInactiveDays?.map((item, index) => <li key={index} className="pointer inactive days_border">{item}</li>)
          }
        </ul>
      </section>
    </div>
  );
};

export default Calendar;
