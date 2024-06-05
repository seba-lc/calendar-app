import "./LegendBox.css";

const LegendItem2 = ({ bg, legend, homeOffice, halfDay, size }) => {
  return (
    <div className="d-flex align-items-center mb-2">
      <div
          className={`${homeOffice ? "legend-item_homeOffice" : "legend-item"} ${bg} ${halfDay ? "halfDay" : null}`}
          style={{ borderColor: `var(--${bg})`, height: size, width: size }}
        ></div>
      <span className="ms-2">{legend}</span>
    </div>
  );
};

export default LegendItem2;