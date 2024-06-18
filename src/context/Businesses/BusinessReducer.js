import { DELETE_BUSINESS_AREA, GET_BUSINESSES_AREAS, POST_BUSINESS_AREA } from "../../type"

export default (state, action) => {
  switch(action.type){
    case GET_BUSINESSES_AREAS:
      return {
        ...state,
        businessAreas: action.payload
      }

    case POST_BUSINESS_AREA:
      return {
        ...state,
        businessAreas: state.businessAreas.concat([action.payload])
      }

    case DELETE_BUSINESS_AREA:
      return {
        ...state,
        businessAreas: state.businessAreas.filter(area => area !== action.payload)
      }
  }
}