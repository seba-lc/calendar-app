export const businessRegisterValidations = (values) => {
  let errors = {};
  if (!values.businessName) {
    errors.businessName = 'El nombre es obligatorio'
  } else if (values.businessName.trim().length > 30){
    errors.businessName = 'El nombre no puede poseer más de 30 caracteres'
  } else if (values.businessName.trim().length < 3){
    errors.businessName = 'El nombre no puede poseer menos de 3 caracteres'
  }
  
  if (!values.userName) {
    errors.userName = 'El nombre es obligatorio'
  } else if (values.userName.trim().length > 30){
    errors.userName = 'El nombre no puede poseer más de 30 caracteres'
  } else if (values.userName.trim().length < 3){
    errors.userName = 'El nombre no puede poseer menos de 3 caracteres'
  }

  if (!values.userEmail) {
    errors.userEmail = 'El email es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmail)) {
    errors.userEmail = 'El email no es válido';
  } else if (values.userEmail.trim().length > 50) {
    errors.userEmail = 'El email no puede contener más de 50 caracteres';
  } else if (values.userEmail.trim().length < 8) {
    errors.userEmail = 'El email no puede contener menos de 8 caracteres';
  } else if (values.userEmail.trim().split(" ").length > 1) {
    errors.userEmail = 'El email no puede contener espacios';
  }

  if (!values.userPassword || !values.userPasswordRepeated) {
    errors.password = 'La contraseña es obligatoria'
  } else if (values.userPassword !== values.userPasswordRepeated) {
    errors.password = 'Las contraseñas no coinciden'
  } else if (values.userPassword.length < 8){
    errors.password = 'La contraseña debe tener como mínimo 8 caracteres'
  } else if (values.userPassword.length > 30) {
    errors.password = 'La contraseña no debe poseer más de 30 caracteres'
  }

  return errors;
};

export const newPasswordValidation = (values) => {
  let errors = {};
  if (!values.userPassword || !values.userPasswordRepeated) {
    errors.password = 'La contraseña es obligatoria'
  } else if (values.userPassword !== values.userPasswordRepeated) {
    errors.password = 'Las contraseñas no coinciden'
  } else if (values.userPassword.length < 8){
    errors.password = 'La contraseña debe tener como mínimo 8 caracteres'
  } else if (values.userPassword.length > 30) {
    errors.password = 'La contraseña no debe poseer más de 30 caracteres'
  }

  return errors;
};