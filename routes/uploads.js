/* 
    Rutas de usuarios / Auth
    host + /api/auth
 */   

const express = require('express');
const router = express.Router();
const { fildsValidator } = require('../middlewares/validator');
const { validateJWT } = require('../middlewares/validate-jwt')
const { check } = require('express-validator');
const { loadArchives } = require('../controllers/uploads');


router.post( '/',  loadArchives);

// router.post();

// router.get('/renew', validateJWT ,revalidateToken);

module.exports = router; 