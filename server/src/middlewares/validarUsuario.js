export const validarUsuario = (req, res, next) => {
    const { nombres, apellidos, correo, numero_telefono, fecha_nacimiento } = req.body;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ '][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;

    if (typeof nombres !== "string" || typeof apellidos !== "string") {
        return res.status(400).json({
            error: "Los nombres y apellidos deben ser texto."
        });
    }

    const requisitosNombres = {
        nombresLongitud: nombres.length >= 2 && nombres.length <= 50,
        apellidosLongitud: apellidos.length >= 2 && apellidos.length <= 50,
        nombresFormato: regexNombre.test(nombres),
        apellidosFormato: regexNombre.test(apellidos)
    };

    const nombresValidos = Object.values(requisitosNombres).every(Boolean);

    if (!nombresValidos) {
        return res.status(400).json({
            error: "Los nombres y apellidos no tienen un formato válido.",
            requisitosNombres
        });
    };

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        typeof correo !== "string" ||
        correo.length > 100 ||
        !regexCorreo.test(correo)
    ) {
        return res.status(400).json({
            error: "El correo no tiene un formato válido."
        });
    }

    if (typeof numero_telefono !== "string") {
        return res.status(400).json({
            error: "El número de teléfono debe ser un texto."
        });
    }

    const requisitosTelefono = {
        longitudMinima: numero_telefono.length >= 10,
        longitudMaxima: numero_telefono.length <= 15,
        soloNumeros: /^[0-9]+$/.test(numero_telefono)
    };

    const telefonoValido = Object.values(requisitosTelefono).every(Boolean);

    if (!telefonoValido) {
        return res.status(400).json({
            error: "El teléfono no cumple con los requisitos.",
            requisitosTelefono
        });
    }

    const requisitosFecha = {
        esTexto: typeof fecha_nacimiento === "string",
        formatoCorrecto: /^\d{4}-\d{2}-\d{2}$/.test(fecha_nacimiento)
    };

    const fechaValida = Object.values(requisitosFecha).every(Boolean);

    if (!fechaValida) {
        return res.status(400).json({
            error: "La fecha de nacimiento no tiene un formato válido.",
            requisitosFecha
        });
    }

    next();
};

export const validarContrasena = (req, res, next) => {
    const { contrasena } = req.body;

    if (typeof contrasena !== "string") {
        return res.status(400).json({
            error: "La contraseña debe ser un texto."
        });
    }

    const requisitosContrasena = {
        minimo6: contrasena.length >= 6,
        mayuscula: /[A-Z]/.test(contrasena),
        minuscula: /[a-z]/.test(contrasena),
        numero: /\d/.test(contrasena),
        especial: /[^A-Za-z0-9\s]/.test(contrasena),
        sinEspacios: !/\s/.test(contrasena)
    };

    const contrasenaValida = Object.values(requisitosContrasena).every(Boolean);

    if (!contrasenaValida) {
        return res.status(400).json({
            error: "La contraseña no cumple con los requisitos",
            requisitosContrasena
        });
    }

    next();
};