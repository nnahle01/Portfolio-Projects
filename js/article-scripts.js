// article-scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización del tema
    function initTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        const lightIcon = document.getElementById('lightIcon');
        const darkIcon = document.getElementById('darkIcon');

        // Si no existen los elementos necesarios, salir
        if (!themeToggle || !lightIcon || !darkIcon) return;

        // Función para actualizar iconos
        function updateIcons(isDark) {
            darkIcon.classList.toggle('hidden', isDark);
            lightIcon.classList.toggle('hidden', !isDark);
        }

        // Establecer tema inicial
        const prefersDark = localStorage.theme === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (prefersDark) {
            html.classList.add('dark');
            updateIcons(true);
        } else {
            html.classList.remove('dark');
            updateIcons(false);
        }

        // Evento de cambio de tema
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateIcons(isDark);
        });
    }

    // 2. Inicialización del selector de idioma
    function initLanguage() {
        const langButton = document.getElementById('langButton');
        const langMenu = document.getElementById('langMenu');
        const currentLang = document.getElementById('currentLang');
        
        if (!langButton || !langMenu || !currentLang) return;

        // Establecer idioma actual
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
    }

    // 3. Inicialización del menú móvil
    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!mobileMenuButton || !mobileMenu) return;

        window.toggleMobileMenu = function() {
            mobileMenu.classList.toggle('hidden');
        };
    }

    // 4. Inicialización del botón "Back to Top"
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('translate-y-20', 'opacity-0');
                backToTop.classList.add('translate-y-0', 'opacity-100');
            } else {
                backToTop.classList.add('translate-y-20', 'opacity-0');
                backToTop.classList.remove('translate-y-0', 'opacity-100');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Inicialización de estilos de artículo
    function initArticleStyles() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        // Estilos para párrafos
        articleContent.querySelectorAll('p').forEach(p => {
            p.classList.add('mb-6', 'leading-relaxed');
        });

        // Estilos para encabezados
        articleContent.querySelectorAll('h2').forEach(h2 => {
            h2.classList.add('text-2xl', 'font-bold', 'mb-4', 'mt-8', 'text-gray-900', 'dark:text-white');
        });

        // Estilos para listas
        articleContent.querySelectorAll('ul, ol').forEach(list => {
            list.classList.add('mb-6', 'ml-6');
            list.querySelectorAll('li').forEach(li => {
                li.classList.add('mb-2');
            });
        });

        // Estilos para blockquotes
        articleContent.querySelectorAll('blockquote').forEach(quote => {
            quote.classList.add(
                'border-l-4',
                'border-blue-500',
                'pl-4',
                'italic',
                'my-6',
                'text-gray-700',
                'dark:text-gray-300'
            );
        });
    }

    // Inicializar todo
    initTheme();
    initLanguage();
    initMobileMenu();
    initBackToTop();
    initArticleStyles();
});