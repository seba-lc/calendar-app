import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import './RegistrationPage.css';
import RegisterForm from '../../components/Forms/RegisterForm';
import Layout from '../../components/Layout/Layout';

const RegistrationPage = () => {
  const [newUserBoolean, setNewUserBoolean] = useState(false);

  return (
    <Layout>
      {/* LOGO DEL EMPRENDIMIENTO */}
      <RegisterForm newUserBoolean={newUserBoolean} setNewUserBoolean={setNewUserBoolean} />
      <LoginForm newUserBoolean={newUserBoolean} setNewUserBoolean={setNewUserBoolean} />
    </Layout>
  );
};

export default RegistrationPage;