'use strict';

import { Router } from 'express';
import {
    getAllFertilizers,
    getFertilizerById,
    createFertilizer,
    updateFertilizer,
    deleteFertilizer
} from './fertilizers.controller.js';

const router = Router();

router.get('/', getAllFertilizers);
router.get('/:id', getFertilizerById);
router.post('/', createFertilizer);
router.put('/:id', updateFertilizer);
router.delete('/:id', deleteFertilizer);

export default router;
