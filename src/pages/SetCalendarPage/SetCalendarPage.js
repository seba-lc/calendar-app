import Calendar from '../../components/Calendar/Calendar';
import './SetCalendarPage.css';
import logoImg from './../../assets/Consulting.png'

const SetCalendarPage = () => {

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  return (
    <div className='calendarPage-style'>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={150} alt="" /></div>
      <Calendar handleClick={handleClick} />
      <div>hola</div>
    </div>
  );
};

export default SetCalendarPage;