const carouselContainer = document.querySelector('.carousel-container');
const serviciosContainer = document.querySelector('.servicios-container');
const servicioCards = Array.from(serviciosContainer.children);
const servicioCardWidth = 308; // Ancho de cada tarjeta
let currentPosition = 1; // Posición actual
const totalCards = servicioCards.length; // Total de tarjetas
let autoScrollInterval;
let isPaused = false; // Para pausar el desplazamiento automático
let isDragging = false; // Para saber si se está arrastrando
let startX = 0; // Posición inicial del mouse
let scrollLeft = 0; // Posición de desplazamiento inicial
let autoScrollTimeout; // Temporizador para reiniciar el desplazamiento automático

function updateCarousel() {
    serviciosContainer.style.transform = `translateX(-${currentPosition * servicioCardWidth}px)`;
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (!isPaused && !isDragging) {
            currentPosition++;
            if (currentPosition > totalCards - 1) {
                currentPosition = 2; // Reinicia la posición
                serviciosContainer.style.transition = 'none'; // Sin transición
                updateCarousel();
                setTimeout(() => {
                    serviciosContainer.style.transition = 'transform 0.3s ease-in-out'; // Transición más rápida (0.3s)
                }, 10);
            } else {
                updateCarousel();
            }
        }
    }, 2000); // Intervalo reducido a 2 segundos (antes era 3000ms)
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
}

function resetAutoScroll() {
    stopAutoScroll();
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 3000);
}

// Clonar tarjetas para efecto infinito
window.addEventListener('load', () => {
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
});

// Eventos para pausar el desplazamiento automático
serviciosContainer.addEventListener('mouseenter', () => {
    isPaused = true;
});

serviciosContainer.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Eventos para arrastrar manualmente
serviciosContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - serviciosContainer.offsetLeft;
    scrollLeft = serviciosContainer.scrollLeft;
    stopAutoScroll();
});

serviciosContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        resetAutoScroll();
    }
});

serviciosContainer.addEventListener('mouseup', () => {
    isDragging = false;
    resetAutoScroll();
});

serviciosContainer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.pageX - serviciosContainer.offsetLeft;
        const walk = (x - startX) * 3; // Aumentado a *3 para mayor velocidad al arrastrar
        serviciosContainer.scrollLeft = scrollLeft - walk;
    }
});

// Botones de navegación
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

nextButton.addEventListener('click', () => {
    currentPosition++;
    if (currentPosition > totalCards - 1) {
        currentPosition = 2;
        serviciosContainer.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            serviciosContainer.style.transition = 'transform 0.3s ease-in-out'; // Transición más rápida
        }, 10);
    } else {
        updateCarousel();
    }
    resetAutoScroll();
});

prevButton.addEventListener('click', () => {
    currentPosition--;
    if (currentPosition < 1) {
        currentPosition = totalCards - 2;
        serviciosContainer.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            serviciosContainer.style.transition = 'transform 0.3s ease-in-out'; // Transición más rápida
        }, 10);
    } else {
        updateCarousel();
    }
    resetAutoScroll();
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

    const form = document.getElementById('contacto-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        console.log('Formulario enviado:', { nombre, telefono, correo });
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    });

});
