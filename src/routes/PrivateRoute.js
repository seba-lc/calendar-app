import { useContext } from "react"
import UserContext from "../context/Users/UserContext"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(UserContext);

  //donde esta el true ira el auth
  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;