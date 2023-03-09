const express = require('express');
const router = express.Router();
const { check } = require('express-validator')


const { validateJWT } = require('../middlewares/validate-jwt');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes');
const { fildsValidator } = require('../middlewares/validator');
const { isDate } = require('../helpers/idDate');
//Todas tienen que pasar por la validación del token
//obtener notas


router.get(
    '/', 
    [
        check( 'title', 'El título debe ser obligatorio' ).not().isEmpty(),
        check('body', 'El cuerpo de la nota no debe estar vacío').not().isEmpty(),
        check( 'date', 'La fecha debe ser obligatoria' ).custom( isDate ),
        fildsValidator
    ],validateJWT , getNotes );

//crear nuevo evento

router.post('/', validateJWT , createNote );

//actualizar evento

router.put('/:id', validateJWT , updateNote );

//borrar nota

router.delete('/:id', validateJWT , deleteNote  );

module.exports = router;