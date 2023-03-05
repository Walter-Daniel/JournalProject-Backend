

const register = (req, res) => {

    const { name, surname, email, password } = req.body;

    
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