import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { tareasPost, tareasGet } from './tareas.controller.js';

const router = Router();

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('fechaInicio', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('fechaCierre', 'La fecha de cierre es obligatoria').not().isEmpty(),
        check('nombreResponsable', 'El nombre del responsable es obligatorio').not().isEmpty(),
        validarCampos
    ],
    tareasPost
);

router.get(
    '/',
    tareasGet
);

export default router;
