import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import './RegistrationPage.css';
import RegisterForm from '../../components/Forms/RegisterForm';

const RegistrationPage = () => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className='registrationPage-style'>
      <RegisterForm newUser={newUser} setNewUser={setNewUser} />
      <LoginForm newUser={newUser} setNewUser={setNewUser} />
    </div>
  );
};

export default RegistrationPage;