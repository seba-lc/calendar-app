const paintDay = (workMood, element) => {
  if(workMood === 'homeOfDay' && element.id.length !== 0){
    if(element.classList.contains('homeOf-selected-style')){
      element.classList.remove('homeOf-selected-style')
    }else{
      element.classList.add('homeOf-selected-style')
    }
  }
  if(workMood === 'halfDay' && element.id.length !== 0){
    if(element.classList.contains('halfDay-selected-style')){
      element.classList.remove('halfDay-selected-style')
    }else{
      element.classList.add('halfDay-selected-style')
    }
  }
}

export default paintDay;