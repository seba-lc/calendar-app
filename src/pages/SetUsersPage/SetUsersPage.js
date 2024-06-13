import NewAreaUserForm from '../../components/Forms/NewAreaUserForm';
import './SetUsersPage.css';
import logoImg from './../../assets/Consulting.png';

const SetUsersPage = () => {
  return (
    <div className='setUsersPage-style'>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={200} alt="" /></div>
      <NewAreaUserForm />
    </div>
  );
};

export default SetUsersPage;