// Configuración de EmailJS
(function() {
    emailjs.init("dZeIXJlUhbtOH4run");
})();

// Configuración de Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-X6G35WLRSE');

// Configuración de Tailwind
tailwind.config = {
    darkMode: 'class'
};
// Configuracion boton load more posts
const blogConfig = {
    postsPerPage: 3, // Número de posts a mostrar inicialmente y en cada carga
    currentPage: 1,
    totalPosts: 0,
    language: window.location.pathname.includes('-en') ? 'en' : 'es'
   
};

// Función para descargar certificados
function downloadCertificate(fileUrl, fileName) {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
            alert('Error al descargar el archivo. Por favor, intente nuevamente.');
        });
}

//Moment Banner
function closeBanner() {
    const banner = document.getElementById('devBanner');
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 300);
}

// Gestor de tema claro/oscuro
function initThemeManager() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');

    if (!themeToggle || !lightIcon || !darkIcon) return;

    function updateIcons(isDark) {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    }

    function toggleTheme() {
        const isDark = html.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        updateIcons(isDark);
    }

    // Inicializar tema
    const prefersDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (prefersDark) {
        html.classList.add('dark');
        updateIcons(true);
    } else {
        html.classList.remove('dark');
        updateIcons(false);
    }

    // Eventos
    themeToggle.addEventListener('click', toggleTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const shouldBeDark = e.matches;
        html.classList.toggle('dark', shouldBeDark);
        updateIcons(shouldBeDark);
        localStorage.theme = shouldBeDark ? 'dark' : 'light';
    });
}

// Gestor de idiomas
function initLanguageManager() {
    const langButton = document.getElementById('langButton');
    const langMenu = document.getElementById('langMenu');
    const currentLang = document.getElementById('currentLang');
    
    if (!langButton || !langMenu || !currentLang) return;

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

// Gestor de scroll suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Si estamos en móvil y el menú está abierto, lo cerramos
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Gestor de menú móvil
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    window.toggleMobileMenu = function() {
        mobileMenu.classList.toggle('hidden');
    };

    // Cerrar menú al hacer click en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Gestor de modales
function initModals() {
    // Hacer las funciones disponibles globalmente
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Cerrar modal al hacer click fuera
    window.onclick = function(event) {
        if (event.target.classList.contains('fixed')) {
            event.target.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('[id^="modal"]').forEach(modal => {
                modal.classList.add('hidden');
            });
            document.body.style.overflow = 'auto';
        }
    });
}

// Gestor de proyectos
function initProjectFilters() {
    // Hacer la función filterProjects disponible globalmente
    window.filterProjects = function(category) {
        // Remover clase activa de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-800', 'text-gray-300');
        });

        // Agregar clase activa al botón seleccionado
        const activeButton = document.querySelector(`[data-filter="${category}"]`);
        if (activeButton) {
            activeButton.classList.remove('bg-gray-800', 'text-gray-300');
            activeButton.classList.add('bg-blue-600', 'text-white');
        }

        // Filtrar proyectos
        const projects = document.querySelectorAll('.proyecto');
        projects.forEach(project => {
            project.style.transition = 'opacity 0.3s ease-in-out';
            const projectCategory = project.dataset.category;
            
            if (category === 'todos' || projectCategory === category) {
                project.style.opacity = '0';
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                }, 50);
            } else {
                project.style.opacity = '0';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    };

    // Inicializar con "todos" seleccionado
    filterProjects('todos');
}

// Gestor de animaciones scroll
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div, .proyecto, .card').forEach((elem) => {
        elem.style.opacity = "0";
        observer.observe(elem);
    });
}
// Gestor del botón Back to Top
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.remove('translate-y-20', 'opacity-0');
            backToTop.classList.add('translate-y-0', 'opacity-100');
        } else {
            backToTop.classList.add('translate-y-20', 'opacity-0');
            backToTop.classList.remove('translate-y-0', 'opacity-100');
        }
    }

    // Evento scroll
    window.addEventListener('scroll', updateBackToTop);

    // Evento click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Llamada inicial para establecer el estado correcto
    updateBackToTop();
}
// Funciones de utilidad
const utils = {
    // Función para convertir fecha del formato "DD MMM YYYY" a "YYYY-MM-DD"
    convertDate: (dateStr) => {
        const months = {
            'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Ago': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
        };
        
        const [day, month, year] = dateStr.split(' ');
        return `${year}-${months[month]}-${day.padStart(2, '0')}`;
    },

    // Función para decodificar entidades HTML
    decodeHtmlEntities: (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
};

// Gestor del Blog
const blogManager = {
    createPostElement: (post) => {
        const article = document.createElement('article');
        article.className = 'bg-white dark:bg-[#1E2635]/50 backdrop-blur rounded-lg overflow-hidden';
        
        const decodedExcerpt = utils.decodeHtmlEntities(post.excerpt);
        const isSpanish = blogConfig.language === 'es';
        
        article.innerHTML = `
            <div class="group relative w-full h-[105px] overflow-hidden">
                <img 
                    src="${post.image}" 
                    alt="${post.title}"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                >
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-sm font-medium text-rose-500">${post.category}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">${post.date}</span>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    ${post.title}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    ${decodedExcerpt}
                </p>
                <a href="${post.url}" class="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                    ${isSpanish ? 'Leer más' : 'Read More'}
                </a>
            </div>
        `;

        const cardLink = article.querySelector('a[href]');
        cardLink.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        return article;
    },

    loadBlogPosts: async function(isLoadMore = false) {
        const blogPreview = document.getElementById('blog-preview');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        if (!blogPreview) return;
    
        try {
            if (!isLoadMore) {
                blogPreview.innerHTML = `
                    <div class="col-span-full text-center text-gray-400">
                        <div class="animate-pulse">
                            ${blogConfig.language === 'en' ? 'Loading articles...' : 'Cargando artículos...'}
                        </div>
                    </div>
                `;
            }
    
            const jsonFile = blogConfig.language === 'en' ? 'blog-posts-en.json' : 'blog-posts-es.json';
            const response = await fetch(`./data/${jsonFile}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            if (!Array.isArray(data.posts)) {
                throw new Error(
                    blogConfig.language === 'en' 
                        ? 'Invalid JSON format' 
                        : 'El JSON no tiene el formato esperado'
                );
            }
    
            if (!isLoadMore) {
                blogPreview.innerHTML = '';
                blogConfig.currentPage = 1;
            }
    
            const sortedPosts = data.posts.sort((a, b) => 
                new Date(utils.convertDate(b.date)) - new Date(utils.convertDate(a.date))
            );
    
            blogConfig.totalPosts = sortedPosts.length;
    
            const startIndex = (blogConfig.currentPage - 1) * blogConfig.postsPerPage;
            const endIndex = Math.min(startIndex + blogConfig.postsPerPage, sortedPosts.length);
            const postsToShow = sortedPosts.slice(startIndex, endIndex);
    
            postsToShow.forEach(post => {
                const postElement = blogManager.createPostElement(post);
                blogPreview.appendChild(postElement);
            });
    
            if (loadMoreContainer) {
                if (endIndex >= sortedPosts.length) {
                    loadMoreContainer.style.display = 'none';
                } else {
                    loadMoreContainer.style.display = 'block';
                    blogConfig.currentPage++;
                }
            }
    
        } catch (error) {
            console.error('Error loading blog posts:', error);
            if (!isLoadMore) {
                blogPreview.innerHTML = `
                    <div class="col-span-full text-center text-red-400">
                        <p>${blogConfig.language === 'en' 
                            ? 'Sorry, there was an error loading the articles' 
                            : 'Lo sentimos, hubo un error al cargar los artículos'}: ${error.message}</p>
                        <button 
                            onclick="blogManager.loadBlogPosts()" 
                            class="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                        >
                            ${blogConfig.language === 'en' ? 'Try again' : 'Intentar de nuevo'}
                        </button>
                    </div>
                `;
            }
        }
    },

    handleLoadMore: function() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;
    
        loadMoreBtn.disabled = true;
        const spanElement = loadMoreBtn.querySelector('span');
        const svgElement = loadMoreBtn.querySelector('svg');
        
        if (spanElement) {
            spanElement.textContent = blogConfig.language === 'en' ? 'Loading...' : 'Cargando...';
        }
        
        if (svgElement) {
            svgElement.style.opacity = '0.5';
            svgElement.classList.add('animate-spin');
        }
    
        this.loadBlogPosts(true)
            .then(() => {
                loadMoreBtn.disabled = false;
                if (spanElement) {
                    spanElement.textContent = blogConfig.language === 'en' 
                        ? 'Load more posts' 
                        : 'Cargar más posts';
                }
                if (svgElement) {
                    svgElement.style.opacity = '1';
                    svgElement.classList.remove('animate-spin');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                loadMoreBtn.disabled = false;
                if (spanElement) {
                    spanElement.textContent = blogConfig.language === 'en' 
                        ? 'Load more posts' 
                        : 'Cargar más posts';
                }
                if (svgElement) {
                    svgElement.style.opacity = '1';
                    svgElement.classList.remove('animate-spin');
                }
            });
    }
};

// Hacer el blogManager globalmente accesible
window.blogManager = blogManager;

// Hacer el blogManager globalmente accesible
window.blogManager = blogManager;

// Hacer el blogManager globalmente accesible
window.blogManager = blogManager;
            
// Inicialización general
document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initLanguageManager();
    initSmoothScroll();
    initMobileMenu();
    initModals();
    initProjectFilters();
    initScrollAnimations();
    initBackToTop();
    blogManager.loadBlogPosts();

    // Hacer global la función de descarga
    window.downloadCertificate = downloadCertificate;
});