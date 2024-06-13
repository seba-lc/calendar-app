import './Layout.css';

const Layout = ({children}) => {
  return (
    <div className='layout-style'>
      {children}
    </div>
  );
};

export default Layout;