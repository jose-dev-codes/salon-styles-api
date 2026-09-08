export const obtenerError = (requisitos) => {
    return requisitos.find(
        requisito => !requisito.condicion
    )?.mensaje ?? null;
};

export const esFechaValida = (fecha) => {
    const [anio, mes, dia] = fecha.split("-").map(Number);

    const fechaObjeto = new Date(anio, mes - 1, dia);

    return (
        fechaObjeto.getFullYear() === anio &&
        fechaObjeto.getMonth() === mes - 1 &&
        fechaObjeto.getDate() === dia
    );
};

export const crearRequisitosFecha = (fecha, nombreCampo) => {
    return [
        {
            condicion: fecha.trim().length > 0,
            mensaje: `${nombreCampo} es obligatoria.`
        },
        {
            condicion: /^\d{4}-\d{2}-\d{2}$/.test(fecha),
            mensaje: `${nombreCampo} debe tener el formato AAAA-MM-DD.`
        },
        {
            condicion: esFechaValida(fecha),
            mensaje: `${nombreCampo} no es válida.`
        }
    ];
};

export const crearRequisitosNombre = (valor, nombreCampo) => {
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ '][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;

    return [
        {
            condicion: valor.trim().length > 0,
            mensaje: `${nombreCampo} son obligatorios.`
        },
        {
            condicion: valor.length >= 2 && valor.length <= 50,
            mensaje: `${nombreCampo} deben tener entre 2 y 50 caracteres.`
        },
        {
            condicion: regexNombre.test(valor),
            mensaje: `${nombreCampo} solo puede contener letras, espacios y apóstrofes.`
        }
    ];
};

export const obtenerFechaActual = () => {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Bogota"
    }).format(new Date());
};
