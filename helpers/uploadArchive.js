const { v4: uuidv4 } = require('uuid');
const path = require('path');


const uploadArchives = ( files, validateExtension = [ 'jpg', 'jpeg', 'png', 'gif' ], folder = '' ) => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[ shortName.length -1 ];

        //Validar la extension
        if( !validateExtension.includes( extension )) {
            return reject(`Extensiones permitidas: ${validateExtension}`)
        };

        const temporalName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname , '../uploads/', folder, temporalName);

        file.mv(uploadPath, (err) => {
            if (err) {
            return reject(err);
            };
            
            resolve( temporalName )
        });
    })

    
}

module.exports = {
    uploadArchives
}