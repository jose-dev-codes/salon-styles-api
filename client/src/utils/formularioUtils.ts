export const limpiarError = (
  setter: (texto: string) => void
) => {
  setter('');
};

export const actualizarCampo = (
  texto: string,
  setter: (texto: string) => void,
  setterError: (texto: string) => void
) => {
  setter(texto);
  limpiarError(setterError);
}

export const limpiarCampos = (datos: Record<string, string>) => {
  const datosLimpios: Record<string, string> = {};

  Object.keys(datos).forEach((campo) => {
    datosLimpios[campo] = datos[campo].trim();
  });

  return datosLimpios;
};

export type Requisito = {
  condicion: boolean,
  mensaje: string
};

export const obtenerError = (requisitos: Requisito[]) => {
  return requisitos.find(
    requisito => !requisito.condicion
  )?.mensaje ?? null;
};

export const formatearHora = (hora: string) => {
  return hora.slice(0, 5);
};

export const formatearFecha = (fecha: string) => {
  return fecha.split('T')[0];
};

export const formatearPrecio = (precio: string | number) => {
  return `$${Number(precio).toLocaleString('es-CO')}`;
};

export const formatearHora12 = (hora: string) => {
  const horaRecortada = formatearHora(hora);
  const [horas, minutos] = horaRecortada.split(':');
  const horasNumero = parseInt(horas, 10);

  const periodo = horasNumero >= 12 ? 'p.m.' : 'a.m.';
  const horas12 = horasNumero % 12 === 0 ? 12 : horasNumero % 12;

  return `${horas12}:${minutos} ${periodo}`;
};

export const formatearFechaLarga = (fecha: string) => {
  const fechaFormateada = new Date(fecha);

  return fechaFormateada.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long'
  });
};
