import { Router } from "express";
import {
    getAllCropsAdmin,
    getCropByNameAdmin,
    getCropByIdAdmin,
    createCropAdmin,
    updateCropAdmin,
    deleteCropAdmin,
    activateCropAdmin,
    getActiveCropsAdmin
} from "./crops.controller.js";

import { uploadCropImage } from "../../middlewares/file-uploader.js";
import {
    validateCreateCrop,
    validateUpdateCrop,
    validateGetCropById,
    validateGetCropByName,
} from "../../middlewares/crops-validation.js";

const router = Router();

// Listar todos los cultivos
router.get("/", getAllCropsAdmin);
router.get("/active", getActiveCropsAdmin);

// Buscar cultivo por nombre
router.get("/:nombreCultivo", validateGetCropByName, getCropByNameAdmin);

// Buscar cultivo por ID
router.get("/id/:id", validateGetCropById, getCropByIdAdmin);

// Crear cultivo
router.post(
    "/",
    uploadCropImage.single("image"),
    validateCreateCrop,
    createCropAdmin
);

// Editar cultivo
router.put(
    "/:id",
    uploadCropImage.single("image"),
    validateUpdateCrop,
    updateCropAdmin
);

// Eliminar cultivo
router.put("/:id/deactivate", validateGetCropById, deleteCropAdmin);
// Activar cultivo
router.put("/:id/activate", validateGetCropById, activateCropAdmin);

export default router;