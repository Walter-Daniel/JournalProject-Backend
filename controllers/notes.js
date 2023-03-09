const Note = require('../schemas/NoteSchema')
// {
//     ok: true,
//     msg: 'obtener evento'
// }

const getNotes = async( req, res ) => {

    res.json({
        ok: true,
        msg: 'Nota obtenida'
    })

};

const createNote = async( req, res ) => {

    const newNote = new Note( req.body );

    try {

        newNote.user = req.id

        await newNote.save()
        res.status(200).json({
            ok: true,
            note: newNote         
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, conectese con el administrador'
        })
    }

};

const updateNote = async( req, res ) => {

    res.json({
        ok: true,
        msg: 'Nota actualizada'
    })

};

const deleteNote = async( req, res ) => {

    res.json({
        ok: true,
        msg: 'Nota borrada'
    })

};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}