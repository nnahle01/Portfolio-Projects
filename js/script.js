// Objeto principal para manejar todas las funcionalidades del sitio
const MindfulTech = {
    // Inicialización general del sitio
    init: function() {
        this.initLoader();
        this.initTheme();
        this.initScrollEffects();
        this.initFormValidation();
        this.initSmoothScroll();
        this.initHeaderScroll();
        this.initMobileMenu(); // Nueva línea para el menú móvil
        this.carousel.init();
    },

    // Loader inicial
    initLoader: function() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    },

    // Manejo del tema oscuro/claro
    initTheme: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', document.body.dataset.theme);
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
        }
    },

    // Efectos de scroll
    initScrollEffects: function() {
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    },

    // Inicialización del menú móvil
    initMobileMenu: function() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-link');
        
        const toggleMenu = () => {
            const isOpen = mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open', isOpen);
        };

        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !e.target.closest('.nav-links') &&
                !e.target.closest('.mobile-menu-toggle')) {
                toggleMenu();
            }
        });
    },

    // Validación del formulario
    initFormValidation: function() {
        const contactForm = document.getElementById('contact-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const showError = (element, message) => {
            const errorDiv = document.getElementById(`${element.id}-error`);
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            element.classList.add('error');
        };

        const hideError = (element) => {
            const errorDiv = document.getElementById(`${element.id}-error`);
            errorDiv.style.display = 'none';
            element.classList.remove('error');
        };

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor, ingresa tu nombre');
                isValid = false;
            } else {
                hideError(nameInput);
            }

            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            } else {
                hideError(emailInput);
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor, ingresa tu mensaje');
                isValid = false;
            } else {
                hideError(messageInput);
            }

            if (isValid) {
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            }
        });
    },

    // Scroll suave
    initSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Comportamiento del header al scroll
    initHeaderScroll: function() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            if (currentScroll === 0) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            }

            lastScroll = currentScroll;
        });
    },

    // Objeto para manejar el carrusel
    carousel: {
        currentSlide: 0,
        slides: null,
        indicators: null,

        init: function() {
            this.slides = document.querySelectorAll('.carousel-slide');
            this.indicators = document.querySelector('.carousel-indicators');
            
            if (!this.slides.length) return; // Si no hay slides, no inicializar

            // Crear indicadores
            this.slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => this.goToSlide(index));
                this.indicators.appendChild(indicator);
            });

            // Botones de navegación
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => this.prevSlide());
                nextButton.addEventListener('click', () => this.nextSlide());
            }

            // Autoplay
            this.startAutoplay();
        },

        updateSlides: function() {
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
            });
            
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        },

        nextSlide: function() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlides();
        },

        prevSlide: function() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlides();
        },

        goToSlide: function(index) {
            this.currentSlide = index;
            this.updateSlides();
        },

        startAutoplay: function() {
            setInterval(() => this.nextSlide(), 5000);
        }
    }
};

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    MindfulTech.init();
});