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
                    serviciosContainer.style.transition = 'transform 0.5s ease-in-out'; // Vuelve a habilitar la transición
                }, 10);
            } else {
                updateCarousel();
            }
        }
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

window.addEventListener('load', () => {
    const firstCardClone = servicioCards[0].cloneNode(true);
    const secondCardClone = servicioCards[1].cloneNode(true);
    const lastCardClone = servicioCards[totalCards - 1].cloneNode(true);

    serviciosContainer.appendChild(firstCardClone);
    serviciosContainer.appendChild(secondCardClone);
    serviciosContainer.insertBefore(lastCardClone, serviciosContainer.firstChild);

    servicioCards.unshift(lastCardClone);
    servicioCards.push(firstCardClone, secondCardClone);

    currentPosition = 1; // Posición inicial
    updateCarousel();
    startAutoScroll(); // Inicia el desplazamiento automático
});

// Eventos para pausar el desplazamiento automático al pasar el mouse
serviciosContainer.addEventListener('mouseenter', () => {
    isPaused = true;
});

serviciosContainer.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Eventos para el desplazamiento manual
serviciosContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - serviciosContainer.offsetLeft;
    scrollLeft = serviciosContainer.scrollLeft;
    stopAutoScroll(); // Detiene el desplazamiento automático
});

serviciosContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        startAutoScroll(); // Reinicia el desplazamiento automático
    }
});

serviciosContainer.addEventListener('mouseup', () => {
    isDragging = false;
    startAutoScroll(); // Reinicia el desplazamiento automático
});

serviciosContainer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.pageX - serviciosContainer.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para ajustar la velocidad
        serviciosContainer.scrollLeft = scrollLeft - walk; // Desplaza el contenedor
    }
});

// Botones de desplazamiento manual
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

nextButton.addEventListener('click', () => {
    currentPosition++;
    if (currentPosition > totalCards - 1) {
        currentPosition = 2; // Reinicia la posición
        serviciosContainer.style.transition = 'none'; // Sin transición
        updateCarousel();
        setTimeout(() => {
            serviciosContainer.style.transition = 'transform 0.5s ease-in-out'; // Vuelve a habilitar la transición
        }, 10);
    } else {
        updateCarousel();
    }
    stopAutoScroll(); // Detiene el desplazamiento automático
});

prevButton.addEventListener('click', () => {
    currentPosition--;
    if (currentPosition < 1) {
        currentPosition = totalCards - 2; // Va al último elemento
        serviciosContainer.style.transition = 'none'; // Sin transición
        updateCarousel();
        setTimeout(() => {
            serviciosContainer.style.transition = 'transform 0.5s ease-in-out'; // Vuelve a habilitar la transición
        }, 10);
    } else {
        updateCarousel();
    }
    stopAutoScroll(); // Detiene el desplazamiento automático
});

// Código para el modal de contacto
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