import { useEffect, useState } from "react";
import "./LegendBox.css";

const LegendItem = ({ bg, legend, homeOffice, halfDay, size, className }) => {
  const [sizeToNumber, setSizeToNumber] = useState(0);

  useEffect(() => {
    setSizeToNumber(Number(size.substring(0, size.length-2)));
  }, [])

  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      {halfDay ? (
        <div className="d-flex flex-column round-item">
          <div className="halfDay-style_1" style={{width: size, height: sizeToNumber/2+'px', backgroundColor: "transparent", borderRadius: `${sizeToNumber/2}px ${sizeToNumber/2}px 0 0`}}></div>
          <div className={bg} style={{width: size, height: sizeToNumber/2+'px', borderRadius: `0 0 ${sizeToNumber/2}px ${sizeToNumber/2}px`}}></div>
        </div>
      ) : (
        <div
          className={`ms-auto ${homeOffice ? "legend-item_homeOffice" : "legend-item"} ${bg}`}
          style={{ borderColor: `var(--${bg})`, height: size, width: size }}
        ></div>
      )}
      {
        legend ? <span className="ms-2">{legend}</span> : null
      }
    </div>
  );
};

export default LegendItem;
