import { useContext } from "react"
import UserContext from "../context/Users/UserContext"
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // const { adminKey } = useContext(UserContext);
  const adminKey = localStorage.getItem('adminKey');

  //donde esta el true ira el auth
  return adminKey ? children : <Navigate to="/" />;
};

export default AdminRoute;