import './PopUp.css';

const PopUp = ({ popUp, setPopUp, popUpTitle, popUpText, popUpBtnFunction, popUpBtnText, closeBtn }) => {
  return (
    <div className={`overlay ${popUp ? 'active' : null}`} id="overlay">
      <div className="popup">
        {
          closeBtn ? (
            <span className="close" id="close" onClick={() => popUp ? setPopUp(false) : setPopUp(true)}>&times;</span>
          ) : null
        }
        <h2>{popUpTitle}</h2>
        <p>{popUpText}</p>
        {
          popUpBtnText ? (
            <button className='popUpBtn-style' onClick={popUpBtnFunction}>{popUpBtnText}</button>
          ) : null
        }
      </div>
    </div>
  );
};

export default PopUp;