
const Note = require('../schemas/NoteSchema');

const getNotes = async( req, res ) => {

   try {
       let searchCriteria = {};
       const { id} = req.params; 

        if (id) {
            searchCriteria = {
                user : {
                    _id : id
                }
            }   
        };

        const [ notes, total ] = await Promise.all([
            Note.find(searchCriteria).populate({
                                            path: 'user',
                                            select: 'id'
                                        })
                                        .collation({ locale: 'es' }),   
            Note.find(searchCriteria).countDocuments()
        ]);
        
        res.status(200).json({
            ok: true,
            msg: 'Notas obtenidas',
            notes,
            total,
        });       
    
   } catch (error) {

            res.status(400).json({
                ok: false,
                msg: 'Error al obtener las notas'
            });
   }
};

const createNote = async( req, res ) => {
    const newNote = new Note( req.body );
    try {
        newNote.user = req.id
        await newNote.save()
        res.status(200).json({
            ok: true,
            note: newNote         
        });
        
    } catch (error) {  
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contactese con el administrador'
        });
    };

};

const updateNote = async( req, res ) => {
    const noteId = req.params.id;
    const userId = req.id

    try {
        const noteToUpdate = await Note.findById( noteId );
        if ( !noteToUpdate ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una nota con ese id'
            })
        };

        if( noteToUpdate.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'No se encuentra autorizado para editar la nota'
            })
        };

        const newData = {
            ...req.body
        };

        const noteUpdate = await Note.findByIdAndUpdate( noteId,  newData, { new: true } );

        res.status(200).json({
            ok: true,
            note: noteUpdate
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    };
};

const deleteNote = async( req, res ) => {

    const noteId = req.params.id;
    const userId = req.id

    try {
        const noteToDelete = await Note.findById( noteId );
        if ( !noteToDelete ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una nota con ese id'
            })
        };

        if( noteToDelete.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'No se encuentra autorizado para borrar esta nota la nota'
            })
        };

        await Note.findByIdAndDelete( noteToDelete );

        res.json({
            ok: true,
            msg: 'Nota borrada',
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }; 
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}