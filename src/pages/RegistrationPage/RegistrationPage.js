import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import './RegistrationPage.css';
import RegisterForm from '../../components/Forms/RegisterForm';
import logoImg from './../../assets/Consulting.png';
import Layout from '../../components/Layout/Layout';

const RegistrationPage = () => {
  const [newUserBoolean, setNewUserBoolean] = useState(false);

  return (
    <Layout>
      {/* <div className='logo-style'><img src={logoImg} className='ms-4' width={300} alt="" /></div> */}
      <RegisterForm newUserBoolean={newUserBoolean} setNewUserBoolean={setNewUserBoolean} />
      <LoginForm newUserBoolean={newUserBoolean} setNewUserBoolean={setNewUserBoolean} />
    </Layout>
  );
};

export default RegistrationPage;