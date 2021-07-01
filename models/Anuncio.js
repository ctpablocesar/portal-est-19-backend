const { Schema, model } = require('mongoose');

const AnuncioSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

});

AnuncioSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Anuncio', AnuncioSchema);