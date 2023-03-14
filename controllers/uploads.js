const { uploadArchives } = require('../helpers/uploadArchive')

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

module.exports = {
    loadArchives
}