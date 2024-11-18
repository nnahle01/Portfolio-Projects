document.addEventListener('DOMContentLoaded', () => {
    const langButton = document.getElementById('langButton');
    const langMenu = document.getElementById('langMenu');
    const currentLang = document.getElementById('currentLang');
    
    if (langButton && langMenu && currentLang) {
        // Establecer idioma inicial
        currentLang.textContent = window.location.pathname.includes('-en') ? 'EN' : 'ES';

        // Toggle del menú
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!langButton.contains(e.target) && !langMenu.contains(e.target)) {
                langMenu.classList.add('hidden');
            }
        });

        // Cerrar al seleccionar idioma
        langMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => langMenu.classList.add('hidden'));
        });
    }
});