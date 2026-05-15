'use strict';

import Fertilizer from './fertilizers.model.js';

export const getAllFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        return res.status(200).json({
            success: true,
            total: fertilizers.length,
            fertilizers
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener fertilizantes',
            error: error.message
        });
    }
};

export const getFertilizerById = async (req, res) => {
    try {
        const { id } = req.params;
        const fertilizer = await Fertilizer.findById(id);

        if (!fertilizer) {
            return res.status(404).json({
                success: false,
                message: 'Fertilizante no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            fertilizer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener fertilizante',
            error: error.message
        });
    }
};

export const createFertilizer = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.image = req.file.path;
            data.imageId = req.file.filename;
        }

        const fertilizer = new Fertilizer(data);
        await fertilizer.save();

        return res.status(201).json({
            success: true,
            message: 'Fertilizante creado exitosamente',
            fertilizer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear fertilizante',
            error: error.message
        });
    }
};

export const updateFertilizer = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (req.file) {
            data.image = req.file.path;
            data.imageId = req.file.filename;
        }

        const fertilizer = await Fertilizer.findByIdAndUpdate(id, data, { new: true });

        if (!fertilizer) {
            return res.status(404).json({
                success: false,
                message: 'Fertilizante no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fertilizante actualizado exitosamente',
            fertilizer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar fertilizante',
            error: error.message
        });
    }
};

export const deleteFertilizer = async (req, res) => {
    try {
        const { id } = req.params;
        const fertilizer = await Fertilizer.findByIdAndUpdate(id, { isActive: false }, { new: true });

        if (!fertilizer) {
            return res.status(404).json({
                success: false,
                message: 'Fertilizante no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fertilizante desactivado exitosamente',
            fertilizer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al desactivar fertilizante',
            error: error.message
        });
    }
};
