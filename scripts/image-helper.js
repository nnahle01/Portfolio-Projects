// image-helper.js
const imageHelper = {
    createResponsiveImage(options) {
        const {
            baseName,
            alt,
            caption,
            className = 'w-full my-8',
            sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px'
        } = options;

        const imageHtml = `
            <figure class="${className}">
                <picture class="block w-full rounded-lg overflow-hidden shadow-lg">
                    <source
                        type="image/webp"
                        srcset="img/optimized/${baseName}-400.webp 400w,
                                img/optimized/${baseName}-800.webp 800w,
                                img/optimized/${baseName}-1200.webp 1200w"
                        sizes="${sizes}">
                    <source
                        type="image/jpeg"
                        srcset="img/optimized/${baseName}-400.jpg 400w,
                                img/optimized/${baseName}-800.jpg 800w,
                                img/optimized/${baseName}-1200.jpg 1200w"
                        sizes="${sizes}">
                    <img
                        src="img/optimized/${baseName}-800.jpg"
                        alt="${alt}"
                        class="w-full h-auto"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450">
                </picture>
                ${caption ? `
                    <figcaption class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                        ${caption}
                    </figcaption>
                ` : ''}
            </figure>
        `;

        return imageHtml.trim();
    }
};

// Hacer disponible globalmente
window.imageHelper = imageHelper;