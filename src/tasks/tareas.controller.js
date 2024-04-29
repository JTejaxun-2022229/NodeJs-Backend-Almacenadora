import { response, request } from "express";
import Tarea from "./tarea.model.js";

export const tareasPost = async (req, res = response) => {
    try {
        const { nombre, descripcion, fechaInicio, fechaCierre, nombreResponsable, estado } = req.body;

        const nuevaTarea = new Tarea({
            nombre,
            descripcion,
            fechaInicio,
            fechaCierre,
            nombreResponsable,
            estado
        });

        await nuevaTarea.save();

        res.status(201).json({
            tarea: nuevaTarea,
            msg: "Tarea creada exitosamente"
        });
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const tareasGet = async (req, res = response) => {
    try {
        const { nombre, fechaCierre, estado } = req.query;
        let filtros = {};

        if (nombre) {
            filtros.nombre = { $regex: new RegExp(nombre, "i") };
        }
        if (fechaCierre) {
            filtros.fechaCierre = { $eq: new Date(fechaCierre) };
        }
        if (estado) {
            filtros.estado = estado;
        }

        const tareas = await Tarea.find(filtros);

        res.json({ tareas });
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
