const { uploadArchives } = require('../helpers/uploadArchive')
const Note = require('../schemas/NoteSchema');
const User = require('../schemas/UserSchema');
const Image = require('../schemas/ImageSchema');
const fs = require('fs');

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
             Image.find(searchCriteria).populate
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

    // let modelo;

    // switch ( collection ) {
    //     case 'users':
    //         modelo = await User.findById(id);
    //         if ( !modelo ) {
    //             return res.status(400).json({
    //                 msg: `No existe un usuario con el id ${ id }`
    //             });
    //         }
        
    //     break;
    //     case 'notes':
    //         modelo = await Note.findById(id);
    //         if ( !modelo ) {
    //             return res.status(400).json({
    //                 msg: `No existe una nota con el id ${ id }`
    //             });
    //         }
        
    //     break;
    //     default:
    //         return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    // }



    const promises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (error, { public_id, secure_url  }) => {
            if (error) reject(error);

            const info = {
                title : public_id,
                url: secure_url,
                notes : id
            }
                
            resolve(info);
          });
        });
      });
      
      try {
        const imageUrls = await Promise.all(promises);
        const images = imageUrls.map(url => new Image( url ));
        const result = await Image.insertMany(images);

        return res.json({
            ok:true,
            msg: 'Imagenes subidas exitosamente',
            result
        });
      } catch (error) {
        res.status(500).send('Error al subir las imagenes');
      }
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