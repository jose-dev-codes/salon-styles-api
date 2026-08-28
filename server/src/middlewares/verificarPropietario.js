export const verificarPropietario = (req, res, next) => {
    const esPropietario = req.usuario.id === Number(req.params.id);

    if (!esPropietario) {
        return res.status(403).json({
            error: "Usted no tiene autorización."
        });
    }

    next();
};