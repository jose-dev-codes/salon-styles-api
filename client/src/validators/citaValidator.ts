import { obtenerError, Requisito } from '../utils/formularioUtils';

// Errores por campo de la cita. Solo aparecen los campos que fallaron.
export type ErroresCita = {
  idServicio?: string,
  fechaCita?: string,
  horaCita?: string,
  especialistaCita?: string
};

export const validarCita = (
  fechaCita: string,
  horaCita: string,
  especialistaCita: string,
  idServicio?: string
) => {

  const errores: ErroresCita = {};

  // Validación del servicio (solo si se recibe)
  if (idServicio !== undefined) {
    const requisitosIdServicio: Requisito[] = [
      {
        condicion: idServicio.trim().length > 0,
        mensaje: 'Debes seleccionar un servicio.'
      }
    ];

    const errorIdServicio = obtenerError(requisitosIdServicio);

    if (errorIdServicio) errores.idServicio = errorIdServicio;
  }

   // Validación de la fecha
  const requisitosFecha: Requisito[] = [
    {
      condicion: fechaCita.trim().length > 0,
      mensaje: 'La fecha es obligatoria.'
    },
    {
      condicion: /^\d{4}-\d{2}-\d{2}$/.test(fechaCita),
      mensaje: 'La fecha debe tener el formato AAAA-MM-DD.'
    },
  ];

  const errorFecha = obtenerError(requisitosFecha);

  if (errorFecha) errores.fechaCita = errorFecha;

  // Validación de la hora
  const requisitosHora: Requisito[] = [
    {
      condicion: horaCita.trim().length > 0,
      mensaje: 'La hora es obligatoria.'
    },
    {
      condicion: /^\d{2}:\d{2}$/.test(horaCita),
      mensaje: 'La hora debe tener el formato HH:MM.'
    }
  ];

  const errorHora = obtenerError(requisitosHora);

  if (errorHora) errores.horaCita = errorHora;

  // Validación del especialista
  const requisitosEspecialista: Requisito[] = [
    {
      condicion: especialistaCita.trim().length > 0,
      mensaje: 'El especialista es obligatorio.'
    },
    {
      condicion: especialistaCita.length >= 2 && especialistaCita.length <= 50,
      mensaje: 'El especialista debe tener entre 2 y 50 caracteres.'
    },
    {
      condicion: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:[ '][A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/.test(especialistaCita),
      mensaje: 'El especialista solo puede tener letras.'
    }
  ];

  const errorEspecialista = obtenerError(requisitosEspecialista);

  if (errorEspecialista) errores.especialistaCita = errorEspecialista;

  return errores;
};
