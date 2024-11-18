// Función para manejar el tema
function handleTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');

    // Función para actualizar los iconos y el tema
    function updateTheme(isDark) {
        html.classList.toggle('dark', isDark);
        if (lightIcon && darkIcon) {
            lightIcon.classList.toggle('hidden', !isDark);
            darkIcon.classList.toggle('hidden', isDark);
        }
    }

    // Verificar tema inicial
    const prefersDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Establecer tema inicial
    updateTheme(prefersDark);

    // Toggle del tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = !html.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateTheme(isDark);
        });
    }

    // Escuchar cambios en las preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!('theme' in localStorage)) {
            updateTheme(e.matches);
        }
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleTheme);
} else {
    handleTheme();
}