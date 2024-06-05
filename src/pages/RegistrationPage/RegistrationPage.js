import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import './RegistrationPage.css';
import RegisterForm from '../../components/Forms/RegisterForm';
import logoImg from './../../assets/Consulting.png'

const RegistrationPage = () => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className='registrationPage-style border'>
      <div className='logo-style'><img src={logoImg} className='ms-4' width={300} alt="" /></div>
      <RegisterForm newUser={newUser} setNewUser={setNewUser} />
      <LoginForm newUser={newUser} setNewUser={setNewUser} />
    </div>
  );
};

export default RegistrationPage;