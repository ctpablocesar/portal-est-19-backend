const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getRecetas, crearReceta, actualizarReceta, eliminarReceta, getRecetasPorTiempo, getRecetasPorPalabras } = require('../controllers/recetas');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getRecetas);

router.get('/buscarTiempo/:tiempo', getRecetasPorTiempo);

router.get('/buscarPalabras/:palabras', getRecetasPorPalabras);

router.use(validarJWT);

router.post('/',
    [
        check('titulo', 'Titulo de la receta es obligatorio').not().isEmpty(),
        check('descripcion', 'Descripción de la receta es obligatoria').not().isEmpty(),
        check('ingredientes', 'Ingredientes de la receta son obligatorios').not().isEmpty(),
        check('tiempo', 'Tiempo de la receta es obligatorio').not().isEmpty(),
        check('procedimiento', 'Procedimiento de la receta es obligatorio').not().isEmpty(),
        check('etiquetas', 'Etiquetas de la receta es obligatorio').not().isEmpty(),
        check('status', 'Status de la receta es obligatorio').isBoolean(),
        check('fecha', 'Fecha de la receta es obligatorio').custom(isDate),
        check('tipo', 'Tipo de la receta es obligatorio').not().isEmpty(),
        check('ocacion', 'Ocacion de la receta es obligatorio').not().isEmpty(),
        check('uid', 'Uid de la receta es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearReceta);

router.put('/:id', actualizarReceta);

router.delete('/:id', eliminarReceta);

module.exports = router;