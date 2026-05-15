'use strict';

import { Router } from 'express';
import {
    getAllFertilizers,
    getFertilizerById,
    createFertilizer,
    updateFertilizer,
    deleteFertilizer
} from './fertilizers.controller.js';
import { uploadFertilizerImage } from '../../middlewares/file-uploader.js';

const router = Router();

router.get('/', getAllFertilizers);
router.get('/:id', getFertilizerById);
router.post('/', uploadFertilizerImage.single('image'), createFertilizer);
router.put('/:id', uploadFertilizerImage.single('image'), updateFertilizer);
router.delete('/:id', deleteFertilizer);

export default router;
