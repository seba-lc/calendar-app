import axiosClient from "../settings/axiosClient";

const postNewArea = async (areas, userBusiness) => {
  let errors = {};
  let newAreas = [];
  areas.forEach(area => {
    const newArea = userBusiness.businessAreas.find(item => item.areaName.toUpperCase() === area.areaName.toUpperCase())
    if(!newArea){
      newAreas.push(area)
    }
  })
  
  if(newAreas.length !== 0){
    for(let i=0; i<newAreas.length; i++){
      const areaDB = {
        ...newAreas[i],
        business: userBusiness._id
      }
      try {
        const response = await axiosClient.post('/business/areas', areaDB);
      } catch (error) {
        errors.server = "Error en el Servidor. Intentelo nuevamente."
      }
    }
  }
  return errors;
}

export default postNewArea;