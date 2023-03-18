const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads' });

const { validateJWT } = require('../middlewares/validate-jwt')
const { uploadImagesCloudinary, deleteImagesCloudinary, getImages } = require('../controllers/uploads');


router.get( '/:id', [ validateJWT ] , getImages);
router.post( '/:collection/:id', upload.array('file') , validateJWT, uploadImagesCloudinary);
router.delete('/:id', [ validateJWT ], deleteImagesCloudinary );

// router.get('/renew', validateJWT ,revalidateToken);

module.exports = router; 