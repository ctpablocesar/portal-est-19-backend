const { Schema, model } = require('mongoose');

const NoticiaSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
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

NoticiaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Noticia', NoticiaSchema);