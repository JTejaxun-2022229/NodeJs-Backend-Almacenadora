import { response, request } from "express";
import Tarea from "./tareas.model.js";

export const tareasPost = async (req, res = response) => {
    try {
        const { nombre, descripcion, fechaInicio, fechaCierre, nombreResponsable } = req.body;

        const nuevaTarea = new Tarea({
            nombre,
            descripcion,
            fechaInicio,
            fechaCierre,
            nombreResponsable
        });

        await nuevaTarea.save();

        res.status(201).json({
            tarea: nuevaTarea,
            msg: "Tarea creada exitosamente"
        });
    } catch (error) {
        
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const tareasGet = async (req, res) => {

    try {

        const { nombre, descripcion, fechaInicio, fechaCierre, nombreResponsable, estado } = req.query;

        const filter = {};
        if (nombre) filter.nombre = { $regex: nombre, $options: 'i' };
        if (descripcion) filter.descripcion = { $regex: descripcion, $options: 'i' };
        if (fechaInicio) filter.fechaInicio = { $regex: fechaInicio, $options: 'i' };
        if (fechaCierre) filter.fechaCierre = { $regex: fechaCierre, $options: 'i' };
        if (nombreResponsable) filter.nombreResponsable = { $regex: nombreResponsable, $options: 'i' };
        if (estado) filter.estado = { $regex: estado, $options: 'i' };

        const tareas = await Tarea.find(filter);

        const total = tareas.length;

        res.status(200).json({ total, tareas });
    } catch (error) {

        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const tareasPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    await Tarea.findByIdAndUpdate(id, resto);

    const tarea = await Tarea.findOne({ _id: id });

    res.status(200).json({
        msg: "Tarea actualizada",
        tarea
    });
}

export const tareaCancelada = async (req, res = response) => {
    const { id } = req.params;

    await Tarea.findByIdAndUpdate(id, { estado: 'cancelada' });

    res.status(200).json({
        msg: "Tarea cancelada"
    });
}

export const tareaTerminada = async (req, res = response) => {
    const { id } = req.params;

    await Tarea.findByIdAndUpdate(id, { estado: 'terminada' });

    res.status(200).json({
        msg: "Tarea Terminada"
    });
}