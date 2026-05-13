'use strict';

import { Router } from 'express';
import {
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus
} from './orders.controller.js';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id/status', updateOrderStatus);

export default router;
