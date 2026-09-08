import { obtenerError, Requisito } from '../utils/formularioUtils';

export const validarCita = (
  fechaCita: string,
  horaCita: string,
  especialistaCita: string,
  idServicio?: string
) => {

  if (idServicio !== undefined) {
    const requisitosIdServicio: Requisito[] = [
      {
        condicion: idServicio.trim().length > 0,
        mensaje: 'Debes seleccionar un servicio.'
      }
    ];

    const errorIdServicio = obtenerError(requisitosIdServicio);

    if (errorIdServicio) return errorIdServicio;
  }

  const requisitosFecha: Requisito[] = [
    {
      condicion: fechaCita.trim().length > 0,
      mensaje: 'La fecha es obligatoria.'
    },
    {
      condicion: /^\d{4}-\d{2}-\d{2}$/.test(fechaCita),
      mensaje: 'La fecha debe tener el formto AAAA-MM-DD.'
    },
  ];

  const errorFecha = obtenerError(requisitosFecha);

  if (errorFecha) return errorFecha;

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

  if (errorHora) return errorHora;

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

  if (errorEspecialista) return errorEspecialista;

  return null;
};
