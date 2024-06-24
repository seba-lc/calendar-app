import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './ConfirmationAreaEmailPage.css';
import './../../components/Spinner/Spinner.css'
import NewPasswordForm from '../../components/Forms/NewPasswordForm';

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
        spinner ? <div className="form-spinner"><span className='loader'></span></div> : (
          <NewPasswordForm />
        )
      }
    </Layout>
  );
};

export default ConfirmationAreaEmailPage;