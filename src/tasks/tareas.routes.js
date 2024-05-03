import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {
  tareasPost,
  tareasGet,
  tareasPut,
  tareaCancelada,
  tareaTerminada
} from './tareas.controller.js';

import { existeTareaById } from '../helpers/db-validator.js';

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

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeTareaById),
    validarCampos,
  ],
  tareasPut
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeTareaById),
    validarCampos,
  ],
  tareaCancelada
);

router.patch(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeTareaById),
    validarCampos,
  ],
  tareaTerminada
)

export default router;