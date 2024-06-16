import { useReducer } from "react"
import axiosClient from "../../settings/axiosClient";
import { GET_BUSINESSES_AREAS, POST_BUSINESS_AREA } from "../../type";
import BusinessContext from "./BusinessContext";
import BusinessReducer from "./BusinessReducer";

const BusinessState = ({ children }) => {
  const initialState = {
    //busines general data ya esta en el usuario
    businessAreas: [], //solo se van a traer las areas de acceso del usuario
    calendarData: [] //idem
  }

  const [state, dispatch] = useReducer(BusinessReducer, initialState);

  const getBusinessAreas = async (businessId) => {
    let errors = {};
    try {
      const response = await axiosClient.post('/businessarea', {business: businessId});
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
    if(areas.length !== 0){
      for(let i=0; i<areas.length; i++){
        const areaDB = {
          ...areas[i],
          business: userBusiness._id,
          accessGrantedEmails: [userBusiness.managerEmail, areas[i].managerEmail]
        }
        try {
          const response = await axiosClient.post('/businessarea/area', areaDB);
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

  const deleteBusinessArea = async (businessAreaId) => {

  }

  return (
    <BusinessContext.Provider value={{
      businessData: state.businessData,
      businessAreas: state.businessAreas,
      postBusinessNewArea,
      getBusinessAreas
    }}>
      { children }
    </BusinessContext.Provider>
  )
};

export default BusinessState;