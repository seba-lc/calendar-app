import { useReducer } from "react"
import axiosClient from "../../settings/axiosClient";
import { DELETE_BUSINESS_AREA, GET_BUSINESSES_AREAS, POST_BUSINESS_AREA } from "../../type";
import BusinessContext from "./BusinessContext";
import BusinessReducer from "./BusinessReducer";

const BusinessState = ({ children }) => {
  const initialState = {
    //busines general data ya esta en el usuario
    businessAreas: [], //solo se van a traer las areas de acceso del usuario
    calendarData: [] //idem
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
        return errors;
      }
    } catch (error) {
      errors.server = "Error en el Servidor. Intentelo nuevamente.";
      return errors;
    }
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

  return (
    <BusinessContext.Provider value={{
      businessData: state.businessData,
      businessAreas: state.businessAreas,
      postBusinessNewArea,
      getUserBusinessAreas,
      deleteBusinessArea
    }}>
      { children }
    </BusinessContext.Provider>
  )
};

export default BusinessState;