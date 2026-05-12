'use strict';

import Product from './products.model.js';

// VER TODOS LOS PRODUCTOS
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('deviceRef')
            .populate('fertilizerRef')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los productos', error: error.message });
    }
};

// OBTENER PRODUCTO POR ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('deviceRef').populate('fertilizerRef');

        if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el producto', error: error.message });
    }
};

// CREAR PRODUCTO
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({ success: true, message: 'Producto creado exitosamente', data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el producto', error: error.message });
    }
};

// EDITAR PRODUCTO
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updated) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

        res.status(200).json({ success: true, message: 'Producto actualizado', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el producto', error: error.message });
    }
};

// ELIMINAR PRODUCTO (soft delete)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });

        if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

        res.status(200).json({ success: true, message: 'Producto eliminado', data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el producto', error: error.message });
    }
};
