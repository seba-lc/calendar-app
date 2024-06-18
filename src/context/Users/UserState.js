import { useReducer } from "react"
import UserReducer from "./UserReducer"
import axiosClient from "../../settings/axiosClient";
import { POST_USER, REMOVE_USER } from "../../type";
import UserContext from "./UserContext";

const UserState = ({ children }) => {
  const initialState = {
    userData: {}, //userName, userEmail
    userBusiness: {}, //businessManager, businessName, managerEmail, _id
    adminKey: null,
    checkedUser: false,
    auth: false
  }

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getAuth = async () => {
    const token = localStorage.getItem('ID');
    if(token){
      axiosClient.defaults.headers.common['x-auth-token'] = token;
      try {
        const response = await axiosClient.get('/user');
        if(response.status === 200){
          if(response.data === null){
            dispatch({
              type: REMOVE_USER
            })
          }else{
            dispatch({
              type: POST_USER,
              payload: response.data
            })
          }
        }
      } catch (error) {
        dispatch({
          type: REMOVE_USER
        })
      }
    }
  }

  const getUserByEmail = async (userLog) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/user', userLog);
      if(response.status === 200){
        localStorage.setItem('ID', response.data.id);
        getAuth();
      }else if(response.status === 201){
        errors.data = 'Datos Incorrectos';
        dispatch({
          type: REMOVE_USER
        });
      }
      return errors;
    } catch (error) {
      errors.server = 'Error en el servidor, inténtelo nuevamente';
      dispatch({
        type: REMOVE_USER
      });
      return errors
    }
  }

  const postUserNewPassword = async (passwordData, token) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/user/password', {user: token, userNewPassword: passwordData});
      if(response.status === 200){
        localStorage.setItem('ID', response.data.id);
        getAuth();
      }
    } catch (error) {
      errors.server = 'Error en el servidor, inténtelo nuevamente';
      dispatch({
        type: REMOVE_USER
      });
    }
    return errors;
  }

  return (
    <UserContext.Provider value={{
      userData: state.userData,
      userBusiness: state.userBusiness,
      adminKey: state.adminKey,
      checkedUser: state.checkedUser,
      auth: state.auth,
      getAuth,
      getUserByEmail,
      postUserNewPassword
    }}>
      { children }
    </UserContext.Provider>
  )
};

export default UserState;