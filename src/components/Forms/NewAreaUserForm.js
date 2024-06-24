import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './Forms.css';
import Spinner from "../Spinner/Spinner";
import UserContext from "../../context/Users/UserContext";
import BusinessContext from "../../context/Businesses/BusinessContext";

const NewAreaUserForm = ({ setAreaSelectedId, setUserAdded }) => {
  const [newAreaUser, setNewAreaUser] = useState({
    userName: "",
    userEmail: "",
    userArea: ""
  });
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userData, userBusiness } = useContext(UserContext);
  const { businessAreas, postNewEmployeeUser } = useContext(BusinessContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(spinner){
      return
    }
    setSpinner(true);
    const dataDB = {
      ...newAreaUser,
      business: [userBusiness._id]
    }
    const postError = await postNewEmployeeUser(dataDB, userBusiness._id, userData.userEmail);
    if(Object.keys(postError).length !== 0){
      setErrors(postError);
      return;
    }
    setUserAdded(true);
    setSuccess(true);
  };

  const handleKeyUp = (e) => {
    if(Object.keys(errors).length !== 0 && e.keyCode !== 13){
      setErrors({});
    }
    setNewAreaUser({
      ...newAreaUser,
      [e.target.name]: e.target.value,
    });
  };

  const functionAfterSuccess = () => {
    document.getElementById('newAreaUser-form').reset();
  }

  useEffect(() => {
    if(businessAreas.length === 1){
      setNewAreaUser({
        ...newAreaUser,
        userArea: businessAreas[0]._id
      })
    }
  }, [businessAreas])

  useEffect(() => {
    if(newAreaUser.userArea.length !== 0){
      setAreaSelectedId(newAreaUser.userArea)
    }
  }, [newAreaUser])

  return (
    <Form onSubmit={handleSubmit} id="newAreaUser-form" className="newAreaUserForm-style">
      <Spinner spinner={spinner} setSpinner={setSpinner} success={success} setSuccess={setSuccess} errors={errors} setErrors={setErrors} popUpError={false} functionAfterSuccess={functionAfterSuccess} />
      <Form.Group className="my-3" controlId="formBasicNameNewUser">
        <Form.Label>Nombre nuevo Integrante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresá tu nombre"
          onKeyUp={handleKeyUp}
          name="userName"
          maxLength={50}
          required={true}
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
          required={true}
        />
      </Form.Group>
      
      <Form.Group className="my-3" controlId="formBasicAreaNewUser">
      <Form.Label>Area</Form.Label>
        <Form.Select name="userArea" onChange={handleKeyUp}>
          {
            businessAreas.length === 1 ? (
              <option value={businessAreas[0]._id}>{businessAreas[0].areaName}</option>
            ) : (
              <>
                <option>-- Seleccione un área --</option>
                {
                  businessAreas.map((area, index) => (
                    <option value={area._id} key={index}>{area.areaName}</option>
                  ))
                }
              </>
            )
          }
        </Form.Select>
      </Form.Group>

      {Object.keys(errors).length !== 0
        ? Object.values(errors).map((error, index) => (
            <div className="border border-danger w-100 text-danger text-center mb-2" key={index}>{error}</div>
          ))
        : null}

      <Button variant="dark" className="w-100 my-3" type="submit">
        Generar Usuario
      </Button>

    </Form>
  );
};

export default NewAreaUserForm;