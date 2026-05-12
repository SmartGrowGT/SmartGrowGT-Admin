import Crop from "./crops.model.js";
import { cloudinary } from "../../middlewares/file-uploader.js";

// VER TODOS LOS CULTIVOS (admin)
export const getAllCropsAdmin = async (req, res) => {
    try {
        const crops = await Crop.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: crops });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los cultivos",
            error: error.message,
        });
    }
};

export const getActiveCropsAdmin = async (req, res) => {
    try {
        // Filtrar solo los cultivos activos
        const crops = await Crop.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: crops,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los cultivos activos",
            error: error.message,
        });
    }
};

// BUSCAR CULTIVO POR NOMBRE
export const getCropByNameAdmin = async (req, res) => {
    try {
        const { nombreCultivo } = req.params;

        const crops = await Crop.find({
            name: { $regex: nombreCultivo, $options: "i" },
        }).sort({ name: 1 });

        res.status(200).json({ success: true, data: crops });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar cultivos por nombre",
            error: error.message,
        });
    }
};

// BUSCAR CULTIVO POR ID
export const getCropByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findById(id);

        if (!crop)
            return res.status(404).json({ success: false, message: "Cultivo no encontrado" });

        res.status(200).json({ success: true, data: crop });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el cultivo",
            error: error.message,
        });
    }
};

// CREAR CULTIVO
export const createCropAdmin = async (req, res) => {
    try {
        const cropData = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "La imagen es obligatoria" });
        }

        cropData.image = req.file.path;
        cropData.imageId = req.file.filename;

        const crop = new Crop(cropData);
        await crop.save();

        res.status(201).json({
            success: true,
            message: "Cultivo creado exitosamente",
            data: crop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el cultivo",
            error: error.message,
        });
    }
};

// EDITAR CULTIVO
export const updateCropAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findById(id);

        if (!crop)
            return res.status(404).json({ success: false, message: "Cultivo no encontrado" });

        const updateData = { ...req.body };

        if (req.file) {

            // eliminar imagen anterior
            if (crop.imageId) {
                await cloudinary.uploader.destroy(crop.imageId);
            }

            // guardar nueva imagen
            updateData.image = req.file.path;
            updateData.imageId = req.file.filename;
        }

        const updatedCrop = await Crop.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Cultivo actualizado exitosamente",
            data: updatedCrop,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el cultivo",
            error: error.message,
        });
    }
};
// ELIMINAR CULTIVO
export const deleteCropAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findById(id);

        if (!crop)
            return res.status(404).json({ success: false, message: "Cultivo no encontrado" });

        // eliminar imagen de Cloudinary si quieres liberar espacio (opcional)
        if (crop.imageId) {
            await cloudinary.uploader.destroy(crop.imageId);
        }

        // marcar como inactivo en vez de eliminar
        crop.isActive = false;
        await crop.save();

        res.status(200).json({
            success: true,
            message: "Cultivo desactivado exitosamente",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al desactivar el cultivo",
            error: error.message,
        });
    }
};

// ACTIVAR CULTIVO (revertir soft delete)
export const activateCropAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const crop = await Crop.findById(id);

        if (!crop)
            return res.status(404).json({
                success: false,
                message: "Cultivo no encontrado",
            });

        // activar cultivo
        crop.isActive = true;
        await crop.save();

        res.status(200).json({
            success: true,
            message: "Cultivo activado exitosamente",
            data: crop,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al activar el cultivo",
            error: error.message,
        });
    }
};