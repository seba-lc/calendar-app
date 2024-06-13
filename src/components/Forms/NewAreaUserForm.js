import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";
import LegendItem from "../LegendBox/LegendItem";

const NewAreaUserForm = () => {
  const [newAreaUser, setNewAreaUser] = useState({
    userName: "",
    userEmail: "",
    userArea: "",
    userColor: ""
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
    console.log(newAreaUser);

    //EN CASO ESTE TODO BIEN
    setSuccess(true);
  };

  const handleKeyUp = (e) => {
    setNewAreaUser({
      ...newAreaUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e, itemId) => {
    
    const oldSelection = document.getElementsByClassName('colorSelected');
    const newSelection = e.target.parentElement.parentElement;
    if(newSelection.classList.contains('select-color-btn')){
      if(oldSelection.length !== 0){
        document.getElementsByClassName('colorSelected')[0].classList.remove('colorSelected')
      }
      newSelection.classList.add('colorSelected');
      setNewAreaUser({
        ...newAreaUser,
        userColor: itemId
      })
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSpinner(false);
        setSuccess(false);
      }, 1500)
    }
  }, [success]);

  return (
    <Form onSubmit={handleSubmit} id="login-form" className="newAreaUserForm-style">
      {
        spinner ? <div className="form-spinner"><Spinner /></div> : null
      }

      <Form.Group className="my-3" controlId="formBasicNameNewUser">
        <Form.Label>Nombre nuevo Integrante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresá tu nombre"
          onKeyUp={handleKeyUp}
          name="userName"
          maxLength={50}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="formBasicEmailNewUser">
        <Form.Label>Email nuevo Integrante</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresá tu email"
          onKeyUp={handleKeyUp}
          name="userEmail"
          maxLength={50}
        />
      </Form.Group>
      
      <Form.Group className="my-3" controlId="formBasicAreaNewUser">
      <Form.Label>Area</Form.Label>
        <Form.Select name="userArea" onChange={handleKeyUp}>
          <option>-- Seleccione un área --</option>
          <option value="impuestos">Impuestos</option>
          <option value="finanzas">Finanzas</option>
          <option value="recHum">Recursos Humanos</option>
        </Form.Select>
      </Form.Group>

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

      {Object.keys(errors).length !== 0
        ? Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))
        : null}

      <Button variant="dark" className="w-100 my-3" type="submit">
        Generar Usuario
      </Button>

    </Form>
  );
};

export default NewAreaUserForm;