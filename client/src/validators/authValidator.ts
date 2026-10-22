// Errores por campo del inicio de sesión. Solo aparecen los campos que fallaron.
export type ErroresLogin = {
  correo?: string,
  contrasena?: string
};

export const validarLogin = (correo: string, contrasena: string) => {
  const errores: ErroresLogin = {};

  const correoValido = /\S+@\S+\.\S+/;

  //Validación del correo
  if (!correo.trim()) {
    errores.correo = 'El correo es obligatorio.';
  } else if (!correoValido.test(correo)) {
    errores.correo = 'Ingresa un correo válido.';
  }

  //Validación de la contraseña
  if (!contrasena.trim()) {
    errores.contrasena = 'La contraseña es obligatoria.';
  } else if (contrasena.length < 6) {
    errores.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
  }

  return errores;
};
