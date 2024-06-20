const cleanPaintedDays = () => {
  const itemHalfDayList = [].slice.call(document.getElementsByClassName('halfDay-selected-style'));
  const itemHomeOfList = [].slice.call(document.getElementsByClassName('homeOf-selected-style'));
  for(let i=0; i<itemHalfDayList.length; i++){
    itemHalfDayList[i].classList.remove('halfDay-selected-style');
  }
  for(let i=0; i<itemHomeOfList.length; i++){
    itemHomeOfList[i].classList.remove('homeOf-selected-style')
  }
}

export default cleanPaintedDays;