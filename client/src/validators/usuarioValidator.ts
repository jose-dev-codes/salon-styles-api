import { obtenerError, Requisito } from '@/utils/formularioUtils';

// Validación de los datos del registro de usuario
export const validarRegistro = (
  nombres: string,
  apellidos: string,
  correo: string,
  contrasena: string,
  numeroTelefono: string,
  fechaNacimiento: string
) => {

  const campos = [
    nombres,
    apellidos,
    correo,
    contrasena,
    numeroTelefono,
    fechaNacimiento
  ];

  const camposVacios = campos.filter(campo => !campo.trim()).length;

  if (camposVacios === campos.length) {
    return 'Por favor, completa todos los campos';
  }

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:[ '][A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validación de nombres
  const requisitosNombres: Requisito[] = [
    {
      condicion: nombres.trim().length > 0,
      mensaje: 'Los nombres son obligatorios'
    },
    {
      condicion:  nombres.length >= 2 && nombres.length <= 50,
      mensaje: 'Los nombres deben tener entre 2 y 50 caracteres'
    },
    {
      condicion: regexNombre.test(nombres),
      mensaje: 'Los nombres solo pueden contener letras'
    }
  ];

  const errorNombres = obtenerError(requisitosNombres);

  if (errorNombres) return errorNombres;

  // Validación de apellidos
  const requisitosApellidos: Requisito[] = [
    {
      condicion: apellidos.trim().length > 0,
      mensaje: 'Los apellidos son obligatorios'
    },
    {
      condicion: apellidos.length >= 2 && apellidos.length <= 50,
      mensaje: 'Los apellidos deben tener entre 2 y 50 caracteres'
    },
    {
      condicion: regexNombre.test(apellidos),
      mensaje: 'Los apellidos solo pueden contener letras'
    }
  ];

  const errorApellidos = obtenerError(requisitosApellidos);

  if (errorApellidos) return errorApellidos;

  // Validación de correo
  const requisitosCorreo: Requisito[] = [
    {
      condicion: correo.trim().length > 0,
      mensaje: 'El correo es obligatorio'
    },
    {
      condicion: correo.length <= 100,
      mensaje: 'El correo no puede superar los 100 caracteres'
    },
    {
      condicion: regexCorreo.test(correo),
      mensaje: 'Ingresa un correo válido'
    }
  ];

  const errorCorreo = obtenerError(requisitosCorreo);

  if (errorCorreo) return errorCorreo;

  // Validación de teléfono
  const requisitosTelefono: Requisito[] = [

    {
      condicion: numeroTelefono.trim().length > 0,
      mensaje: 'El teléfono es obligatorio'
    },
    {
      condicion: numeroTelefono.length >= 10,
      mensaje: 'El teléfono debe tener al menos 10 dígitos'
    },
    {
      condicion: numeroTelefono.length <= 15,
      mensaje: 'El teléfono no puede superar los 15 dígitos'
    },
    {
      condicion: /^[0-9]+$/.test(numeroTelefono),
      mensaje: 'El teléfono solo debe contener números'
    },
  ];

  const errorTelefono = obtenerError(requisitosTelefono);

  if (errorTelefono) return errorTelefono;

  // Validación de fecha de nacimiento
  const requisitosFecha: Requisito[] = [
    {
      condicion: fechaNacimiento.trim().length > 0,
      mensaje: 'La fecha de nacimiento es obligatoria'
    },
    {
      condicion: /^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento),
      mensaje: 'La fecha debe tener el formato AAAA-MM-DD'
    }
  ];

  const errorFecha = obtenerError(requisitosFecha);

  if (errorFecha) return errorFecha;

  // Validación de contraseña
  const requisitosContrasena: Requisito[] = [
    {
      condicion: contrasena.trim().length > 0,
      mensaje: 'La contraseña es obligatoria'
    },
    {
      condicion: contrasena.length >= 6,
      mensaje: 'La contraseña debe tener al menos 6 caracteres'
    },
    {
      condicion: /[A-Z]/.test(contrasena),
      mensaje: 'La contraseña debe tener al menos una mayúscula'
    },
    {
      condicion: /[a-z]/.test(contrasena),
      mensaje: 'La contraseña debe tener al menos una minúscula'
    },
    {
      condicion: /\d/.test(contrasena),
      mensaje: 'La contraseña debe tener al menos un número'
    },
    {
      condicion: /[^A-Za-z0-9\s]/.test(contrasena),
      mensaje: 'La contraseña debe tener al menos un caracter especial'
    },
    {
      condicion: !/\s/.test(contrasena),
      mensaje: 'La contraseña no debe contener espacios'
    }
  ];

  const errorContrasena = obtenerError(requisitosContrasena);

  if (errorContrasena) return errorContrasena;

  return null;
};
