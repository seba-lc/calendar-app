import { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import './ConfirmationEmailPage.css';
import { useParams } from 'react-router-dom';
import axiosClient from '../../settings/axiosClient';

const ConfirmationEmailPage = () => {
  const params = useParams();

  const newUserConfirmationFunction = async () => {
    try {
      const response = await axiosClient.post('/user/emailconfirmation', {user: params.user});
      if(response.status === 200){
        localStorage.setItem('ID', response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    newUserConfirmationFunction();
  }, [])

  return (
    <Layout>
      Aca hare una animacion de que se confirmo el usuario
    </Layout>
  );
};

export default ConfirmationEmailPage;