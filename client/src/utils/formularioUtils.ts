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
