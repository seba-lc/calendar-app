const getDataPerDayPerWorkMood = (dataFromDB) => {
  let dataFormatted = [];
  dataFromDB.forEach(item => {
    item.halfDaydates.forEach(day => {
      const dataAlreadyExist = dataFormatted.find(data => data.date === `${day}-${item.month}` && data.workMood === "halfDay");
      if(dataAlreadyExist){
        dataAlreadyExist.users.push(item.userEmail);
      }else{
        //si el dia no esta
        dataFormatted.push({
          date: `${day}-${item.month}`,
          workMood: "halfDay",
          users: [item.userEmail]
        })
      }
    })
    item.homeOfdates.forEach(day => {
      const dataAlreadyExist = dataFormatted.find(data => data.date === `${day}-${item.month}` && data.workMood === "homeOfDay");
      if(dataAlreadyExist){
        dataAlreadyExist.users.push(item.userEmail);
      }else{
        //si el dia no esta
        dataFormatted.push({
          date: `${day}-${item.month}`,
          workMood: "homeOfDay",
          users: [item.userEmail]
        })
      }
    })
  })
  return dataFormatted;
}

export default getDataPerDayPerWorkMood;
