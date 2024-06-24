import getDataPerDayPerWorkMood from "../../helpers/getDataPerDayPerWorkMood"
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
      console.log(action.payload);
      console.log(state.businessAreas);
      const newArray = state.businessAreas.filter(area => area.areaName !== action.payload.areaName)
      return {
        ...state,
        businessAreas: newArray
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
      const data = state.calendarDataPerBusinessArea.find(item => item.userEmail === dataPushed.userEmail);
      if(data){
        state.calendarDataPerBusinessArea.splice(state.calendarDataPerBusinessArea.indexOf(data), 1);
      }
      const newDataArray = state.calendarDataPerBusinessArea.concat([dataPushed]);
      const newArrayFormatted = getDataPerDayPerWorkMood(newDataArray);
      return {
        ...state,
        calendarDataPerBusinessArea: newDataArray,
        calendarData: newArrayFormatted
      }

    case GET_CALENDAR_DATA_PER_BUSINESSAREA:
      const dataFormatted = getDataPerDayPerWorkMood(action.payload)
      return {
        ...state,
        calendarDataPerBusinessArea: action.payload,
        calendarData: dataFormatted
      }
  }
}