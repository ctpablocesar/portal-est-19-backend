/*
    Rutas de usuarios /Auth
    host + /api/auth
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isType } = require('../helpers/isType');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').custom( isType ),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'El email no es valido').isEmail(),
        check('password', 'Error').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;