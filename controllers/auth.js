const User = require('../schemas/UserSchema');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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

        const token = await generateJWT( newUser.id, newUser.name, newUser.surname  )

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con éxito',
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            token
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
        };

        const token = await generateJWT( userExist.id, userExist.name, userExist.surname  );

        res.status(201).json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            id: userExist.id,
            name: userExist.name,
            surname: userExist.surname,
            token
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    };   
};

const revalidateToken = async(req, res) => {

    try {

        const { id, name, surname } = req;

        const token = await generateJWT( id, name, surname  );

        res.status(200).json({
            ok: true,
            msg:'Se renovó el token',
            id,
            name,
            surname,
            token     
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al renovar el token'
        })
    }

}

module.exports = {
    register,
    login,
    revalidateToken
}