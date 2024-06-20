import { useReducer } from "react"
import axiosClient from "../../settings/axiosClient";
import { DELETE_BUSINESS_AREA, GET_BUSINESSES_AREAS, GET_CALENDAR_DATA_PER_BUSINESSAREA, POST_BUSINESS_AREA, POST_CALENDAR_DATA, UPDATE_BUSINESS_AREA } from "../../type";
import BusinessContext from "./BusinessContext";
import BusinessReducer from "./BusinessReducer";

const BusinessState = ({ children }) => {
  const initialState = {
    //busines general data ya esta en el usuario
    businessAreas: [], //solo se van a traer las areas de acceso del usuario
    calendarDataPerBusinessArea: [] //idem
  }

  const [state, dispatch] = useReducer(BusinessReducer, initialState);

  const getUserBusinessAreas = async (businessId, userLogged) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/businessarea', {business: businessId, userLogged: userLogged});
      if(response.status === 200){
        dispatch({
          type: GET_BUSINESSES_AREAS,
          payload: response.data
        })
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente.";
    }
    return errors;
  }

  const postBusinessNewArea = async (areas, userBusiness) => {
    let errors = {};
    const areasFiltered = areas.filter(area => area._id === undefined);
    if(areasFiltered.length !== 0){
      for(let i=0; i<areasFiltered.length; i++){
        const areaDB = {
          ...areasFiltered[i],
          business: userBusiness._id,
          accessGrantedEmails: [userBusiness.managerEmail, areasFiltered[i].managerEmail]
        }
        try {
          const response = await axiosClient.post('/businessarea/area', areaDB);
          console.log(response.data);
          if(response.status === 200){
            dispatch({
              type: POST_BUSINESS_AREA,
              payload: response.data.businessArea
            })
          }
        } catch (error) {
          errors.server = "Error en el Servidor. Intentelo nuevamente."
        }
      }
    }
    return errors;
  }

  const deleteBusinessArea = async (businessArea) => {
    let errors = {};
    if(businessArea._id){
      try {
        const response = await axiosClient.post('/businessarea/delete', {id: businessArea._id});
        if(response.status === 200){
          dispatch({
            type: DELETE_BUSINESS_AREA,
            payload: businessArea
          })
        }
      } catch (error) {
        errors.server = "Error en el Servidor. Intentelo nuevamente."
      }
    }else{
      dispatch({
        type: DELETE_BUSINESS_AREA,
        payload: businessArea
      })
    }
    return errors;
  }

  const postNewEmployeeUser = async (dataDB, businessId, userLogged) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/user/newuser', dataDB);
      if(response.status === 200){
        console.log(response.data.emailToken);
        getUserBusinessAreas(businessId, userLogged);
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente."
    }
    return errors;
  }

  const updateAccessGrantedEmailList = async (businessAreaId, newList) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/businessarea/areaupdate', {businessAreaId: businessAreaId, newAccessList: newList});
      if(response.status === 200){
        dispatch({
          type: UPDATE_BUSINESS_AREA,
          payload: response.data.updatedBusinessArea
        })
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente."
    }
    return errors;
  }

  const postCalendarDataPerUserPerMonth = async (dataDB) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/calendardata', dataDB);
      if(response.status === 200){
        dispatch({
          type: POST_CALENDAR_DATA,
          payload: dataDB
        })
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente."
    }
    return errors;
  }

  const getCalendarDataPerBusinessArea = async (businessAreaId) => {
    let errors = {};
    try {
      const response = await axiosClient.get(`/calendardata/${businessAreaId}`);
      if(response.status === 200){
        dispatch({
          type: GET_CALENDAR_DATA_PER_BUSINESSAREA,
          payload: response.data
        })
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente."
    }
    return errors;
  }

  return (
    <BusinessContext.Provider value={{
      businessAreas: state.businessAreas,
      calendarDataPerBusinessArea: state.calendarDataPerBusinessArea,
      postBusinessNewArea,
      getUserBusinessAreas,
      deleteBusinessArea,
      postNewEmployeeUser,
      updateAccessGrantedEmailList,
      postCalendarDataPerUserPerMonth,
      getCalendarDataPerBusinessArea
    }}>
      { children }
    </BusinessContext.Provider>
  )
};

export default BusinessState;