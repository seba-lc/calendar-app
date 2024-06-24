import React from 'react';
import LegendItem from '../LegendBox/LegendItem';

const PickColorForm = () => {

  const handleClick = (e, itemId) => {
    const oldSelection = document.getElementsByClassName('colorSelected');
    const newSelection = e.target.parentElement.parentElement;
    if(newSelection.classList.contains('select-color-btn')){
      if(oldSelection.length !== 0){
        document.getElementsByClassName('colorSelected')[0].classList.remove('colorSelected')
      }
      newSelection.classList.add('colorSelected');
      console.log(itemId);
    }
  }

  return (
    <div className="my-2">
      <label>Seleccione un Color</label>
      <div className="mt-2 d-flex justify-content-evenly">
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-1')}><LegendItem bg="bg-1" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-2')}><LegendItem bg="bg-2" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-3')}><LegendItem bg="bg-3" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-4')}><LegendItem bg="bg-4" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-5')}><LegendItem bg="bg-5" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-6')}><LegendItem bg="bg-6" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-7')}><LegendItem bg="bg-7" size="20px" /></div>
        <div className="select-color-btn" onClick={(e) => handleClick(e, 'bg-8')}><LegendItem bg="bg-8" size="20px" /></div>
      </div>
    </div>
  );
};

export default PickColorForm;