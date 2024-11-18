// scripts/image-optimizer.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputDir) {
    try {
        const filename = path.basename(inputPath, path.extname(inputPath));
        const sizes = [400, 800, 1200];
        
        console.log(`Procesando ${filename}...`);
        
        for (const width of sizes) {
            // Generar WebP
            await sharp(inputPath)
                .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, `${filename}-${width}.webp`));

            // Generar JPEG
            await sharp(inputPath)
                .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({
                    quality: 80,
                    progressive: true,
                    mozjpeg: true
                })
                .toFile(path.join(outputDir, `${filename}-${width}.jpg`));
        }
        
        console.log(`✓ ${filename} procesado en todos los tamaños`);
    } catch (error) {
        console.error(`Error al procesar ${inputPath}:`, error);
    }
}

async function processDirectory(inputDir, outputDir) {
    try {
        await fs.mkdir(outputDir, { recursive: true });
        const files = await fs.readdir(inputDir);
        
        console.log(`Encontradas ${files.length} imágenes para procesar`);
        
        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                await optimizeImage(
                    path.join(inputDir, file),
                    outputDir
                );
            }
        }
        
        console.log('¡Optimización completada!');
    } catch (error) {
        console.error('Error al procesar el directorio:', error);
    }
}

module.exports = {
    optimizeImage,
    processDirectory
};