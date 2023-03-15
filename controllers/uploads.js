const { uploadArchives } = require('../helpers/uploadArchive')
const Note = require('../schemas/NoteSchema');
const User = require('../schemas/UserSchema');
const Image = require('../schemas/ImageSchema');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const getImages = async( req, res ) => {
    try {
        let searchCriteria = {};
        const { id } = req.params; 
 
         if (id) {
             searchCriteria = {
                 notes : {
                     _id : id
                 }
             }   
         };
 
         const [ images, total ] = await Promise.all([
             Image.find(searchCriteria)
                                         .collation({ locale: 'es' }),   
             Image.find(searchCriteria).countDocuments()
         ]);
         
         res.status(200).json({
             ok: true,
             msg: 'Imagenes obtenidas',
             images,
             total,
         });       
     
    } catch (error) {

        console.log(error)
 
             res.status(400).json({
                 ok: false,
                 msg: 'Error al obtener las imagenes'
             });
    }
}

const loadArchives = async( req, res ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg: 'no hay archivos a subir'});
        return;
    };
    
    const archiveName = await uploadArchives( req.files );

    res.json({
        archiveName
    })
    
};

const uploadImagesCloudinary = async(req, res ) => {

    const { id, collection } = req.params;

    let modelo;

    switch ( collection ) {
        case 'users':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;
        case 'notes':
            modelo = await Note.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe una nota con el id ${ id }`
                });
            }
        
        break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }

    const newImage = new Image()
    try {
        const { tempFilePath } = req.files.file
        const { secure_url, public_id } = await cloudinary.uploader.upload( tempFilePath );
        newImage.notes = id
        newImage.title = public_id;
        newImage.url = secure_url;

        await newImage.save();

        res.status(200).json({
            ok: true,
            image: newImage        
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contactese con el administrador'
        });
    };
};

const deleteImagesCloudinary = async(req, res ) => {

    const imageId = req.params.id;
    try {
        const imageToDelete = await Image.findById( imageId );
        if ( !imageToDelete ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una imagen con ese id'
            })
        };

        await cloudinary.uploader.destroy( imageToDelete.title );
        await Image.findByIdAndDelete( imageToDelete );

        res.json({
            ok: true,
            msg: 'Imagen borrada',
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }; 
};

module.exports = {
    getImages,
    loadArchives,
    uploadImagesCloudinary,
    deleteImagesCloudinary
}