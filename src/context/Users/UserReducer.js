import axiosClient from "../../settings/axiosClient";
import { POST_USER, REMOVE_USER } from "../../type";

export default (state, action) => {
  switch(action.type){
    case POST_USER: 
      return {
        ...state,
        userData: {
          userName: action.payload.userName,
          userEmail: action.payload.userEmail
        },
        //ACA ME ESTOY QUEDANDO CON UN NEGOCIO. SI SON MAS DE UNO LO VOY A TENER QUE ARREGLAR POR ACA EN EL FUTURO
        userBusiness: action.payload.business[0],
        adminKey: action.payload.adminKey ? action.payload.adminKey : null,
        checkedUser: action.payload.checkedUser,
        auth: true
    }

    case REMOVE_USER:
      if(localStorage.getItem('ID')){
        localStorage.removeItem('ID')
      }
      delete axiosClient.defaults.headers.common['x-auth-token'];
      return {
        ...state,
        userData: {},
        userBusiness: {},
        adminKey: null,
        checkedUser: false,
        auth: false
      }
  }
}