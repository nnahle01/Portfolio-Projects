// scripts/process-images.js
const { processDirectory } = require('./image-optimizer');
const path = require('path');

console.log('Iniciando procesamiento de imágenes...');

processDirectory(
    path.join(__dirname, '../img/original'),
    path.join(__dirname, '../img/optimized')
).then(() => {
    console.log('Proceso completado. Verifica la carpeta img/optimized');
}).catch(error => {
    console.error('Error durante el proceso:', error);
});