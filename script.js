// Variables globales
let currentUser = null;

// Función de inicio de sesión
function login() {
    const username = document.getElementById('discordUsername').value.trim();
    
    if (username === '') {
        alert('Por favor ingresa tu usuario de Discord');
        return;
    }
    
    // Guardar usuario
    currentUser = username;
    localStorage.setItem('greenvx_user', username);
    
    // Ocultar modal
    document.getElementById('loginModal').style.display = 'none';
    
    // Mostrar información del usuario
    showUserInfo();
    
    // Inicializar la página
    initializePage();
}

// Mostrar información del usuario
function showUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const usernameSpan = document.getElementById('username');
    const userAvatar = document.getElementById('userAvatar');
    
    if (currentUser) {
        usernameSpan.textContent = currentUser;
        userInfo.style.display = 'flex';
        
        // Crear avatar con inicial
        const initial = currentUser.charAt(0).toUpperCase();
        userAvatar.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; color: var(--neon-red);">${initial}</div>`;
    }
}

// Toggle del menú móvil
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

// Mostrar sección específica
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Cerrar menú móvil SOLO si estamos en móvil
    if (window.innerWidth <= 768) {
        const nav = document.getElementById('nav');
        nav.classList.remove('active');
    }
    
    // Scroll suave al inicio
    setTimeout(() => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }, 50);
}

// Generar galería de media
function generateMediaGallery() {
    const mediaGrid = document.getElementById('mediaGrid');
    const totalImages = 200;
    
    // Formatos de imagen aceptados
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    mediaGrid.innerHTML = '';
    
    for (let i = 1; i <= totalImages; i++) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.innerHTML = 'Cargando...';
        
        // Intentar cargar con diferentes formatos
        let imageLoaded = false;
        let formatIndex = 0;
        
        function tryLoadImage() {
            if (formatIndex >= imageFormats.length) {
                // No se encontró la imagen en ningún formato
                mediaItem.innerHTML = 'Sin imagen';
                return;
            }
            
            const format = imageFormats[formatIndex];
            const img = new Image();
            const imagePath = `media/image${i}.${format}`; // AHORA BUSCA EN media/ directamente
            
            img.onload = function() {
                mediaItem.innerHTML = `<img src="${imagePath}" alt="Media ${i}" loading="lazy">`;
                imageLoaded = true;
            };
            
            img.onerror = function() {
                formatIndex++;
                tryLoadImage();
            };
            
            img.src = imagePath;
        }
        
        tryLoadImage();
        mediaGrid.appendChild(mediaItem);
    }
}

// También generar con nombres alternativos comunes
function generateMediaGalleryAlternative() {
    const mediaGrid = document.getElementById('mediaGrid');
    
    // Si ya hay imágenes generadas, no hacer nada
    if (mediaGrid.children.length > 0) return;
    
    const totalImages = 200;
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    // Patrones de nombres comunes
    const namePatterns = [
        (i) => `image${i}`,      // image1, image2, etc.
        (i) => `img${i}`,        // img1, img2, etc.
        (i) => `photo${i}`,      // photo1, photo2, etc.
        (i) => `pic${i}`,        // pic1, pic2, etc.
        (i) => `${i}`            // 1, 2, 3, etc.
    ];
    
    mediaGrid.innerHTML = '';
    
    for (let i = 1; i <= totalImages; i++) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.innerHTML = 'Sin imagen';
        
        // Intentar con diferentes patrones y formatos
        let found = false;
        
        for (let pattern of namePatterns) {
            if (found) break;
            
            for (let format of imageFormats) {
                if (found) break;
                
                const img = new Image();
                const imagePath = `media/${pattern(i)}.${format}`; // AHORA BUSCA EN media/ directamente
                
                img.onload = function() {
                    if (!found) {
                        mediaItem.innerHTML = `<img src="${imagePath}" alt="Media ${i}" loading="lazy">`;
                        found = true;
                    }
                };
                
                img.src = imagePath;
            }
        }
        
        mediaGrid.appendChild(mediaItem);
    }
}

// Simular obtención de contador de miembros
function updateMemberCount() {
    // Aquí puedes integrar con la API de Discord cuando esté disponible
    // Por ahora, mostraremos un mensaje indicativo
    
    const memberCountElements = [
        document.getElementById('memberCount'),
        document.getElementById('memberCountInfo')
    ];
    
    // Simulación de carga
    memberCountElements.forEach(element => {
        if (element) {
            element.textContent = 'Cargando...';
        }
    });
    
    // Simular delay de carga
    setTimeout(() => {
        const message = 'Próximamente conectado';
        memberCountElements.forEach(element => {
            if (element) {
                element.textContent = message;
            }
        });
    }, 1000);
    
    // NOTA PARA EL DESARROLLADOR:
    // Para conectar con Discord, necesitarás:
    // 1. Crear un bot de Discord
    // 2. Usar la Discord API
    // 3. Implementar un backend (Node.js recomendado)
    // 
    // Ejemplo de código para obtener miembros (requiere backend):
    /*
    fetch('YOUR_BACKEND_ENDPOINT/discord/members')
        .then(response => response.json())
        .then(data => {
            memberCountElements.forEach(element => {
                if (element) {
                    element.textContent = data.memberCount;
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener miembros:', error);
            memberCountElements.forEach(element => {
                if (element) {
                    element.textContent = 'Error al cargar';
                }
            });
        });
    */
}

// Inicializar la página
function initializePage() {
    // Generar galería
    generateMediaGallery();
    
    // Actualizar contador de miembros
    updateMemberCount();
    
    // Mostrar sección de inicio
    showSection('home');
}

// Verificar si hay sesión guardada
function checkSession() {
    const savedUser = localStorage.getItem('greenvx_user');
    
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById('loginModal').style.display = 'none';
        showUserInfo();
        initializePage();
    }
}

// Evento cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    
    // Permitir login con Enter
    const usernameInput = document.getElementById('discordUsername');
    if (usernameInput) {
        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav && menuToggle) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    }
});

// Función para cerrar sesión (opcional, puedes agregar un botón)
function logout() {
    // Mostrar confirmación
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        currentUser = null;
        localStorage.removeItem('greenvx_user');
        
        // Mostrar notificación
        showNotification('Sesión cerrada exitosamente');
        
        // Esperar un momento antes de recargar
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Efectos de parallax desactivados para mantener el logo estático
// Si quieres reactivar el efecto parallax, descomenta el código siguiente:
/*
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
*/

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.stat-card, .ranking-card, .info-card, .link-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Prevenir zoom en doble tap en móviles
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Optimización de rendimiento para la galería
function lazyLoadImages() {
    const images = document.querySelectorAll('.media-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función de utilidad para copiar links
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar notificación
        showNotification('Link copiado al portapapeles');
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

// Mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--neon-red);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 0 20px var(--neon-red);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento según dispositivo
window.addEventListener('resize', function() {
    if (!isMobile()) {
        document.getElementById('nav').classList.remove('active');
    }
});

console.log('%c🔴 GreenVX Website Loaded Successfully! 🔴', 'color: #ff0000; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff0000;');
console.log('%cPara integración con Discord API, consulta los comentarios en script.js', 'color: #ff3333; font-size: 14px;');