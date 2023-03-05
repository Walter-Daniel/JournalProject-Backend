/* 
    Rutas de usuarios / Auth
    host + /api/auth
 */   

const express = require('express');
const router = express.Router();
const { fildsValidator } = require('../middlewares/validator')
const { check } = require('express-validator');

const { register, login, revalidateToken } = require('../controllers/auth')

router.post(
    '/register',
    [
        check('name', 'El Nombre es obligatorio')
                .not().isEmpty()
                .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/).withMessage('El campo debe contener solamente letras y espacios.')
                .isLength({ min: 2, max: 12}).withMessage('Debe tener una longitud entre 2 y 12 caracteres'),
        check('surname', 'El Apellido es obligatorio')
                .not().isEmpty()
                .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/).withMessage('El campo debe contener solamente letras y espacios.')
                .isLength({ min: 2, max: 12}).withMessage('Debe tener una longitud entre 2 y 12 caracteres'),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio')
                .isStrongPassword({
                    minLength: 6,
                    maxLength: 12, 
                    minLowercase: 1, 
                    minUppercase: 1, 
                    minSymbols: 1
                 }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
        fildsValidator
    ],
    register);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio')
                .isStrongPassword({
                    minLength: 6,
                    maxLength: 12, 
                    minLowercase: 1, 
                    minUppercase: 1, 
                    minSymbols: 1
                 }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
        fildsValidator
    ], login);

router.get('/renew', revalidateToken);

module.exports = router; 