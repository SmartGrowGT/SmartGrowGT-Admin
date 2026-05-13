'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { cordOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import usersRoutes from '../src/Users/users.routes.js';
import cultivosRoutes from '../src/Crops/crops.routes.js';
import devicesRoutes from '../src/Devices/devices.routes.js';
import adminsRoutes from '../src/Admins/admins.routes.js';
import productsRoutes from '../src/Products/products.routes.js';
import fertilizersRoutes from '../src/Fertilizers/fertilizers.routes.js';
import ordersRoutes from '../src/Orders/orders.routes.js';

const BASE_URL = '/smartgrowgt/v1/admin';

// Configuración de middlewares
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(cordOptions));
    app.use(morgan('dev'));
}

// Integración de rutas
const routes = (app) => {
  // Rutas de la aplicacion
    app.use(`${BASE_URL}/usuarios`, usersRoutes);
    app.use(`${BASE_URL}/cultivos`, cultivosRoutes);
    app.use(`${BASE_URL}/devices`, devicesRoutes);
    app.use(`${BASE_URL}/admins`, adminsRoutes);
    app.use(`${BASE_URL}/products`, productsRoutes);
    app.use(`${BASE_URL}/fertilizers`, fertilizersRoutes);
    app.use(`${BASE_URL}/orders`, ordersRoutes);
};

// Iniciar servidor
const initServer = async (app) => {

    app = express();
    const PORT = process.env.PORT || 3002;

    try {
        dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`El servidor está en el puerto ${PORT}`);
            console.log(`Base URL : http://localhost:${PORT}${BASE_URL}`);
        });

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'SmartGrowGT Admin',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log(error);
    }
}

export { initServer };
