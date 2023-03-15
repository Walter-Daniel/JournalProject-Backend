const { Schema, model } = require('mongoose');

const ImageSchema = Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    },  
    notes: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

module.exports = model('Image', ImageSchema);