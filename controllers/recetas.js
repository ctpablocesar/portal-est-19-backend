const { response } = require("express");
const Receta = require('../models/Receta');

const getRecetas = async (req, res = response) => {

    const anuncios = await Anuncio.find().sort({ fecha: -1 });

    res.json({
        ok: true,
        anuncios
    })

}

const crearReceta = async (req, res = response) => {

    const receta = new Receta(req.body);

    try {

        const recetaGuradada = await receta.save()

        res.json({
            ok: true,
            receta: recetaGuradada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador',
            error
        })
    }
}

const actualizarReceta = async (req, res = response) => {

    const recetaId = req.params.id;

    try {

        const receta = await Receta.findById(recetaId);

        if (!receta) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no existe por id'
            })
        }

        const nuevaReceta = {
            ...req.body,
            'fecha': (Date.now())
        }

        const recetaActualizada = await Receta.findByIdAndUpdate(recetaId, nuevaReceta, { new: true });

        res.json({
            ok: true,
            recetaActualizada: recetaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

const eliminarReceta = async (req, res = response) => {

    const recetaId = req.params.id;

    try {

        const receta = await Receta.findById(recetaId);

        if (!receta) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no existe por id'
            })
        }

        const recetaActualizada = await Receta.findByIdAndDelete(recetaId);

        res.json({ ok: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

const getRecetasPorTiempo = async (req, res = response) => {

    const tiempo = req.params.tiempo;

    try {

        const recetas = await Receta.find({ tiempo: tiempo });//TODO:aplicar limite

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
    
}

const getRecetasPorPalabras = async (req, res = response) => {

    const palabras = req.params.palabras.toString();

    try {

        const recetas = await Receta.find({ procedimiento: { $regex : `${palabras}`, $options: 'i'} });
        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}


module.exports = {
    getRecetas,
    crearReceta,
    actualizarReceta,
    eliminarReceta,
    getRecetasPorTiempo,
    getRecetasPorPalabras
}