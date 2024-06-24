import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";

const AreaForm = ({ areas, setAreas }) => {
  const [areaData, setAreaData] = useState({
    areaName: "",
    managerName: "",
    managerEmail: "",
    homeOfDays: "",
    halfDays: ""
  });
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const filter = areas.filter(area => area.areaName === areaData.areaName);
    if(filter.length === 0){
      setErrors({});
      const newArea = areas.concat([areaData]);
      setAreas(newArea);
      setSuccess(true);
    }else{
      setErrors({
        error: 'El área ya existe'
      })
    }
  };

  const handleKeyUp = (e) => {
    if(Object.keys(errors).length !== 0 && e.keyCode !== 13){
      setErrors({});
    }
    setAreaData({
      ...areaData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  
  const functionAfterSuccess = () => {
    document.getElementById('formBasicAreaName').value = "";
    document.getElementById('formBasicManagerName').value = "";
    document.getElementById('formBasicManagerEmail').value = "";
    document.getElementById('formBasicAreaName').select();
    setAreaData({
      ...areaData,
      areaName: ""
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="areaForm-style my-2 px-4 py-2">
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={false} functionAfterSuccess={functionAfterSuccess} />
      <Form.Group className="mt-3 d-flex align-items-center justify-content-between" controlId="formBasicAreaName">
        <Form.Label>Área</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre del Área"
          onKeyUp={handleKeyUp}
          name="areaName"
          maxLength={50}
          className="w-220"
          required={true}
        />
      </Form.Group>

      <Form.Group className="my-2 d-flex align-items-center justify-content-between" controlId="formBasicManagerName">
        <Form.Label>Jefe del Área</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          onKeyUp={handleKeyUp}
          name="managerName"
          maxLength={50}
          className="w-220"
          required={true}
        />
      </Form.Group>

      <Form.Group className="my-2 d-flex align-items-center justify-content-between" controlId="formBasicManagerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          onKeyUp={handleKeyUp}
          name="managerEmail"
          maxLength={50}
          className="w-220"
          required={true}
        />
      </Form.Group>

      <Form.Group className="my-2 d-flex align-items-center justify-content-between" controlId="formBasicHODays">
        <Form.Label className="text-center">Home Offices por Mes</Form.Label>
        <Form.Control
          type="number"
          onChange={handleKeyUp}
          name="homeOfDays"
          maxLength={40}
          className="w-60"
          required={true}
        />
      </Form.Group>

      <Form.Group className="my-2 d-flex align-items-center justify-content-between" controlId="formBasicHalfDays">
        <Form.Label className="text-center">Medios Días por Mes</Form.Label>
        <Form.Control
          type="number"
          onChange={handleKeyUp}
          name="halfDays"
          maxLength={40}
          className="w-60"
          required={true}
        />
      </Form.Group>

      {Object.keys(errors).length !== 0
        ? Object.values(errors).map((error, index) => (
            <div className="border border-danger w-100 text-danger text-center mb-2" key={index}>{error}</div>
          ))
        : null}

      <Button variant="outline-dark" className="w-100 my-2" type="submit">
        INGRESAR AREA
      </Button>

    </Form>
  );
};

export default AreaForm;