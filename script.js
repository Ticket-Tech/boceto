const carouselContainer = document.querySelector('.carousel-container');
const serviciosContainer = document.querySelector('.servicios-container');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const servicioCards = Array.from(serviciosContainer.children);
const servicioCardWidth = 420; // Ancho de cada tarjeta (400px + 20px de gap)
let currentPosition = 0;
const visibleCards = 5; // Número de tarjetas visibles
const totalCards = servicioCards.length;

function updateCarousel() {
    serviciosContainer.style.transform = `translateX(-${currentPosition * servicioCardWidth}px)`;
}

nextButton.addEventListener('click', () => {
    currentPosition++;
    if (currentPosition > totalCards - visibleCards) {
        // Mover la primera tarjeta al final
        serviciosContainer.appendChild(servicioCards[0]);
        servicioCards.push(servicioCards.shift()); // Actualizar el array de tarjetas
        currentPosition--; // Ajustar la posición
    }
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentPosition--;
    if (currentPosition < 0) {
        // Mover la última tarjeta al inicio
        serviciosContainer.insertBefore(servicioCards[totalCards - 1], serviciosContainer.firstChild);
        servicioCards.unshift(servicioCards.pop()); // Actualizar el array de tarjetas
        currentPosition++; // Ajustar la posición
    }
    updateCarousel();
});

// Asegura que la última tarjeta se vea completa al cargar la página
window.addEventListener('load', () => {
    updateCarousel();
});