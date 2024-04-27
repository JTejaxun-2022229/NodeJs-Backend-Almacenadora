import { Router } from 'express';
import { check } from 'express-validator';
import {
    tareasPut,
    tareaDelete
} from "./tareas.controller.js"

import { existeTareaById } from '../helpers/db-validator.js';

const router = Router();    


