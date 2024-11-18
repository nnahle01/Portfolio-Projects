class ContentLoader {
    static get currentLanguage() {
        return window.location.pathname.includes('-en') ? 'en' : 'es';
    }

    static getContentPath(type) {
        const lang = this.currentLanguage;
        return `/data/${type}-${lang}.json`;
    }

    static async loadLatestPosts(limit = 3) {
        try {
            const response = await fetch(this.getContentPath('blog-posts'));
            if (!response.ok) throw new Error('Error loading posts');
            
            const data = await response.json();
            const latestPosts = data.posts.slice(0, limit);
            
            const blogContainer = document.getElementById('blog-preview');
            if (!blogContainer) return;

            blogContainer.innerHTML = '';
            
            latestPosts.forEach(post => {
                const article = this.createPostElement(post);
                blogContainer.appendChild(article);
            });
        } catch (error) {
            console.error('Error in loadLatestPosts:', error);
            this.showError('blog-preview', 
                this.currentLanguage === 'en' 
                    ? 'Error loading recent stories' 
                    : 'Error cargando las historias recientes'
            );
        }
    }

    static async loadLatestProjects(limit = 3) {
        try {
            const response = await fetch(this.getContentPath('projects'));
            if (!response.ok) throw new Error('Error loading projects');
            
            const data = await response.json();
            const latestProjects = data.projects.slice(0, limit);
            
            const projectsContainer = document.getElementById('projects-preview');
            if (!projectsContainer) return;

            projectsContainer.innerHTML = '';
            
            latestProjects.forEach(project => {
                const projectElement = this.createProjectElement(project);
                projectsContainer.appendChild(projectElement);
            });
        } catch (error) {
            console.error('Error in loadLatestProjects:', error);
            this.showError('projects-preview', 
                this.currentLanguage === 'en' 
                    ? 'Error loading recent projects' 
                    : 'Error cargando los proyectos recientes'
            );
        }
    }

    static createPostElement(post) {
        const readMore = this.currentLanguage === 'en' ? 'Read more' : 'Leer más';
        const template = document.createElement('template');
        template.innerHTML = `
            <article class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group animate-fade-in">
                <div class="relative aspect-w-16 aspect-h-9 overflow-hidden">
                    <img src="${post.image}" 
                         alt="${post.title}" 
                         class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                         loading="lazy"/>
                </div>
                <div class="p-6">
                    <div class="flex items-center space-x-2 mb-4">
                        <span class="text-rose-500 text-sm font-medium">${post.category}</span>
                        <span class="text-gray-400 text-sm">• ${post.date}</span>
                    </div>
                    <h3 class="text-xl font-semibold dark:text-white mb-3">${post.title}</h3>
                    <p class="dark:text-gray-400 mb-4 line-clamp-3">${post.excerpt}</p>
                    <a href="${post.url}" 
                       class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
                        ${readMore}
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </article>
        `.trim();
        return template.content.firstChild;
    }

    static createProjectElement(project) {
        const viewDetails = this.currentLanguage === 'en' ? 'View Details' : 'Ver Detalles';
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group animate-fade-in" 
                 data-category="${project.category}">
                <div class="relative aspect-w-16 aspect-h-9 overflow-hidden">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                         loading="lazy"/>
                </div>
                <div class="p-6">
                    <span class="text-blue-400 text-sm font-medium">${project.type}</span>
                    <h3 class="text-xl font-semibold dark:text-white mt-2 mb-2">${project.title}</h3>
                    <p class="dark:text-gray-400">${project.description}</p><br>
                    <button onclick="openModal('${project.modalId}')" 
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                        <span>${viewDetails}</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `.trim();
        return template.content.firstChild;
    }

    static showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="text-center p-8 text-red-500">
                    <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-lg font-medium">${message}</p>
                </div>
            `;
        }
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    ContentLoader.loadLatestPosts();
    ContentLoader.loadLatestProjects();
});