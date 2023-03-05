const User = require('../schemas/UserSchema');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {

    const {  email, password } = req.body;
      
    try {

        let emailExist = await User.findOne({ email });

        if( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }

        const newUser = new User( req.body );
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );
        await newUser.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con éxito',
            newUser
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear un nuevo usuario'
        });
    }
}

const login = async(req, res) => {

    const { email, password } = req.body;

    try {

       const userExist = await User.findOne({ email });

        if( !userExist ) {
            return res.status(500).json({
                ok: false,
                msg: 'Las credenciales no son correctas'
            });
        }

        const passwordValid = bcrypt.compareSync( password, userExist.password );

        if(!passwordValid){
            return res.status(400).json ({
                ok:false,
                msg: 'Credenciales incorrectas'
            })
        }

        res.status(201).json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            id: userExist.id,
            name: userExist.name
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }

    
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