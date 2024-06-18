import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './ConfirmationAreaEmailPage.css';
import NewPasswordForm from '../../components/Forms/NewPasswordForm';
import Spinner from '../../components/Spinner/Spinner';

const ConfirmationAreaEmailPage = () => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 2000)
  }, [])

  return (
    <Layout>
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : (
          <NewPasswordForm />
        )
      }
    </Layout>
  );
};

export default ConfirmationAreaEmailPage;