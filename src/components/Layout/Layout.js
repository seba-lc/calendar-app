import { useContext } from 'react';
import './Layout.css';
import UserContext from '../../context/Users/UserContext';

const Layout = ({children}) => {
  const { auth, logout } = useContext(UserContext)

  return (
    <div className='layout-style'>
      {
        auth ? <div className='logout-style rounded-pill m-3' onClick={logout}>Log Out</div> : null
      }
      {children}
    </div>
  );
};

export default Layout;