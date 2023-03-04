const { validationResult } = require('express-validator');

const register = (req, res) => {

    const { name, surname, email, password } = req.body;

    //manejo de errores

    const errors = validationResult( req );
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'Usuario creado con éxito',
        name,
        surname,
        email,
        password
    })
}

const login = (req, res) => {

    const { email, password } = req.body;

    const errors = validationResult( req );
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'Inicio de sesión exitoso',
        email,
        password
    })
}

const revalidateToken = (req, res) => {
    res.json({
        ok: true,
        msg:'renew token'
    })
}

module.exports = {
    register,
    login,
    revalidateToken
}