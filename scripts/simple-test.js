// scripts/simple-test.js
console.log('=== Inicio del test de procesamiento ===');

const path = require('path');
const sharp = require('sharp');

async function testProcessImage() {
    try {
        const inputPath = path.join(__dirname, '../img/original/tesla-ia.png');
        const outputPath = path.join(__dirname, '../img/optimized/tesla-ia-400.webp');

        console.log('1. Iniciando procesamiento...');
        console.log('Imagen origen:', inputPath);
        console.log('Destino:', outputPath);

        await sharp(inputPath)
            .resize(400)
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log('¡Imagen procesada con éxito!');
        console.log('Revisa la carpeta img/optimized');
        
    } catch (error) {
        console.error('Error al procesar la imagen:', error.message);
    }
}

// Ejecutar el test
console.log('Iniciando test...');
testProcessImage().then(() => {
    console.log('Test completado');
}).catch(error => {
    console.error('Error en el test:', error);
});