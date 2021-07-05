const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getFrase, crearFrase, actualizarFrase, eliminarFrase} = require('../controllers/frase');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

router.get('/', getFrase);

router.post('/',
    [
        check('mes', 'Mes de la frase obligatorio').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        check('titulo', 'Titulo de la frase es obligatoria').not().isEmpty(),
        check('frase', 'El cuerpo de la frase es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearFrase);

router.put('/:id', actualizarFrase);

module.exports = router;