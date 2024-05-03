import { Router } from 'express';
import { check } from 'express-validator';
import {
    tareasPut,
    tareaCancelada,
    tareaTerminada
} from "./tareas.controller.js"

import { existeTareaById } from '../helpers/db-validator.js';

const router = Router();    


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
    "cancelada/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeTareaById),
      validarCampos,
    ],
    tareaCancelada
  );

  router.delete(
    "terminada/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeTareaById),
      validarCampos,
    ],
    tareaTerminada
  );