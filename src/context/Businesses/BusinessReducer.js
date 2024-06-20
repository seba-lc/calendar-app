import { DELETE_BUSINESS_AREA, GET_BUSINESSES_AREAS, GET_CALENDAR_DATA_PER_BUSINESSAREA, POST_BUSINESS_AREA, POST_CALENDAR_DATA, UPDATE_BUSINESS_AREA } from "../../type"

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

    case UPDATE_BUSINESS_AREA:
      const item = state.businessAreas.find(item => item._id === action.payload._id);
      const index = state.businessAreas.indexOf(item);
      state.businessAreas.splice(index, 1, action.payload);
      return {...state}

    case POST_CALENDAR_DATA:
      const dataPushed = {
        businessAreaId: action.payload.businessAreaId,
        month: action.payload.month,
        halfDaydates: action.payload.halfDaydates,
        homeOfdates: action.payload.homeOfdates,
        userEmail: action.payload.userEmail
      }
      return {
        ...state,
        calendarDataPerBusinessArea: state.calendarDataPerBusinessArea.concat([dataPushed])
      }

    case GET_CALENDAR_DATA_PER_BUSINESSAREA:
      return {
        ...state,
        calendarDataPerBusinessArea: action.payload
      }
  }
}