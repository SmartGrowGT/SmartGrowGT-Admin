import Usuario from './users.model.js';

export const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find({ isActive: true });

        if (usuarios.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron usuarios'
            });
        }

        res.status(200).json({
            success: true,
            total: usuarios.length,
            usuarios
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no existe en la base de datos'
            });
        }

        res.status(200).json({
            success: true,
            usuario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error
        });
    }
};



// Desactivar usuario
export const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOneAndUpdate(
            { _id: id, isActive: true },
            { isActive: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado o ya desactivado' });
        }

        res.status(200).json({ success: true, message: 'Usuario desactivado', user });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar usuario', error });
    }
};

export const activateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOneAndUpdate(
            { _id: id, isActive: false }, // Buscamos específicamente a uno que esté desactivado
            { isActive: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado o ya está activo'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario activado correctamente',
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al activar usuario',
            error
        });
    }
};