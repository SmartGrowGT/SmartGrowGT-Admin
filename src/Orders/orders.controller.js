'use strict';

import Order from './orders.model.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        return res.status(200).json({
            success: true,
            total: orders.length,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos',
            error: error.message
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedido',
            error: error.message
        });
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        
        return res.status(200).json({
            success: true,
            total: orders.length,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos del usuario',
            error: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Estado no válido'
            });
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Estado del pedido actualizado',
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar pedido',
            error: error.message
        });
    }
};
