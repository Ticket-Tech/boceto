const carouselContainer = document.querySelector('.carousel-container');
const serviciosContainer = document.querySelector('.servicios-container');
const servicioCards = Array.from(serviciosContainer.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let servicioCardWidth = 0;
let servicioCardMargin = 0; // Nueva variable para el margen
let currentPosition = 0;
const totalCards = servicioCards.length;
let autoScrollInterval;
let isPaused = false;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let autoScrollTimeout;

const servicioCardWidthTablet = 300; // Ancho fijo para tablets
const servicioCardMarginTablet = 10; // Margen fijo para tablets

function updateCarousel() {
    if (window.innerWidth <= 767) {
        // Para celulares, usar scrollLeft con precisión
        serviciosContainer.scrollLeft = currentPosition * serviciosContainer.offsetWidth;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        // Para tablets, usar scrollLeft con valores fijos
        serviciosContainer.scrollLeft = currentPosition * (servicioCardWidth + servicioCardMargin);
    } else {
        // Para escritorio, usar translateX (código original)
        serviciosContainer.style.transform = `translateX(-${currentPosition * servicioCardWidth}px)`;
    }
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (!isPaused && !isDragging) {
            currentPosition++;
            if (currentPosition >= totalCards) {
                currentPosition = 0;
                serviciosContainer.style.transition = 'none';
                updateCarousel();
                setTimeout(() => {
                    serviciosContainer.style.transition = 'transform 0.3s ease-in-out';
                }, 10);
            } else {
                updateCarousel();
            }
        }
    }, 2000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
}

function resetAutoScroll() {
    stopAutoScroll();
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 2000);
}

function calculateCardWidth() {
    if (window.innerWidth <= 767) {
        // Para celulares, calcular el ancho de la tarjeta dinámicamente
        servicioCardWidth = serviciosContainer.offsetWidth;
        servicioCardMargin = 0; // Sin margen horizontal
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        // Para tablets, usar valores fijos
        servicioCardWidth = servicioCardWidthTablet;
        servicioCardMargin = servicioCardMarginTablet;
    } else {
        // Para escritorio, usar el ancho fijo
        servicioCardWidth = 308;
        servicioCardMargin = 20; // Ajusta este valor según tus márgenes en CSS
    }
}

window.addEventListener('load', () => {
    calculateCardWidth();
    updateCarousel();
    if (window.innerWidth >= 768) {
        // Clonar tarjetas para efecto infinito en tablets y escritorio (sin cambios)
        const firstCardClone = servicioCards[0].cloneNode(true);
        const secondCardClone = servicioCards[1].cloneNode(true);
        const lastCardClone = servicioCards[totalCards - 1].cloneNode(true);

        serviciosContainer.appendChild(firstCardClone);
        serviciosContainer.appendChild(secondCardClone);
        serviciosContainer.insertBefore(lastCardClone, serviciosContainer.firstChild);

        servicioCards.unshift(lastCardClone);
        servicioCards.push(firstCardClone, secondCardClone);

        currentPosition = 1;
        updateCarousel();
        startAutoScroll();
    } else {
        startAutoScroll(); // Iniciar scroll automático en celulares
    }
});

window.addEventListener('resize', () => {
    calculateCardWidth();
    updateCarousel();
});

serviciosContainer.addEventListener('mouseenter', () => {
    isPaused = true;
});

serviciosContainer.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Eventos de clic para los botones (sin cambios)
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = totalCards - 1;
        }
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentPosition++;
        if (currentPosition >= totalCards) {
            currentPosition = 0;
        }
        updateCarousel();
    });
}

// Eventos táctiles (ajustados para celulares)
serviciosContainer.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 767) {
        isDragging = true;
        startX = e.touches[0].pageX - serviciosContainer.offsetLeft;
        scrollLeft = serviciosContainer.scrollLeft;
        stopAutoScroll();
    }
});

serviciosContainer.addEventListener('touchmove', (e) => {
    if (isDragging && window.innerWidth <= 767) {
        const x = e.touches[0].pageX - serviciosContainer.offsetLeft;
        const walk = (x - startX) * 3;
        serviciosContainer.scrollLeft = scrollLeft - walk;
    }
});

serviciosContainer.addEventListener('touchend', () => {
    if (window.innerWidth <= 767) {
        isDragging = false;
        currentPosition = Math.round(serviciosContainer.scrollLeft / serviciosContainer.offsetWidth);
        updateCarousel();
        resetAutoScroll();
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        // Para tablets, usar valores fijos
        isDragging = false;
        currentPosition = Math.round(serviciosContainer.scrollLeft / (servicioCardWidth + servicioCardMargin));
        updateCarousel();
        resetAutoScroll();
    } else {
        isDragging = false;
        resetAutoScroll();
    }
});

// Eventos de ratón (sin cambios)
serviciosContainer.addEventListener('mousedown', (e) => {
    if (window.innerWidth >= 768) {
        isDragging = true;
        startX = e.pageX - serviciosContainer.offsetLeft;
        scrollLeft = serviciosContainer.scrollLeft;
        stopAutoScroll();
    }
});

serviciosContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        resetAutoScroll();
    }
});

serviciosContainer.addEventListener('mouseup', () => {
    if (window.innerWidth >= 768) {
        isDragging = false;
        resetAutoScroll();
    }
});

serviciosContainer.addEventListener('mousemove', (e) => {
    if (isDragging && window.innerWidth >= 768) {
        const x = e.pageX - serviciosContainer.offsetLeft;
        const walk = (x - startX) * 3;
        serviciosContainer.scrollLeft = scrollLeft - walk;
    }
});

// Modal de contacto (sin cambios)
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contacto-modal');
    const contactoLink = document.querySelector('.contacto a');
    const closeBtn = document.querySelector('.close');

    contactoLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }
    });

    const form = document.getElementById('mi-formulario'); // o 'contacto-form'

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = encodeURIComponent(document.getElementById('nombre').value);
        const telefono = encodeURIComponent(document.getElementById('telefono').value);
        const correo = encodeURIComponent(document.getElementById('email').value); // o 'correo'

        const body = `Nombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}`;

        window.location.href = `mailto:consultas@x-seg.com.ar?subject=Formulario de contacto&body=${body}`;
    });
});