/* 
    Rutas de usuarios / Auth
    host + /api/auth
 */   

const express = require('express');
const router = express.Router();
const { fildsValidator } = require('../middlewares/validator');
const { validateJWT } = require('../middlewares/validate-jwt')
const { check } = require('express-validator');
const { uploadImagesCloudinary, deleteImagesCloudinary, getImages } = require('../controllers/uploads');


router.get( '/:id', [ validateJWT ] , getImages);
router.post( '/:collection/:id', [ validateJWT ] , uploadImagesCloudinary);
router.delete('/:id', [ validateJWT ], deleteImagesCloudinary );

// router.get('/renew', validateJWT ,revalidateToken);

module.exports = router; 