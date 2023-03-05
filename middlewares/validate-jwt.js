const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { id, name, surname } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id
        req.name = name
        req.surname = surname

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

}

module.exports = {
    validateJWT
}