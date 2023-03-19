const { Schema, model } = require('mongoose');

const NoteSchema = Schema({
    
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrls: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    }
    // imageUrls: {
    //     type: Array,
    //     "default": []
    // }
});

NoteSchema.method('toJSON', function() {
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
});

module.exports = model('Note', NoteSchema);