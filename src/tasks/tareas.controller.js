import { response, request } from 'express';
import { Tarea } from './tareas.model.js';

export const tareasPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    await Tarea.findByIdAndUpdate(id, resto);

    const tarea = await Tarea.findOne({_id: id});

    res.status(200).json({
        msg: "Tarea actualizada",
        tarea
    });
}

export const  tareaDelete = async (req, res = response) => {
    const { id } = req.params;

    await Tarea.findByIdAndDelete(id, { estado: false});

    res.status(200).json({
        msg: "Tarea eliminada"
    });
}