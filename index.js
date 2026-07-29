import dotenv from 'dotenv';
dotenv.config();

import { initServer, app } from './configs/app.js';

// Prevenir que un error rompa la instancia serverless
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

// Iniciar base de datos
console.log('Iniciando servidor de SmartGrowGT Admin....');
initServer();

export default app;