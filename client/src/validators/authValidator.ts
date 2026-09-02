export const validarLogin = (correo: string, contrasena: string) => {
  if (!correo.trim()) {
    return 'El correo es obligatorio';
  }

  const correoValido = /\S+@\S+\.\S+/;

  if (!correoValido.test(correo)) {
    return 'Ingresa un correo válido';
  }

  if (!contrasena.trim()) {
    return 'La contraseña es obligatoria';
  }

  if (contrasena.length < 6) {
    return 'La contraseña debe tener al menos 6 carcateres';
  }

  return null;
};
