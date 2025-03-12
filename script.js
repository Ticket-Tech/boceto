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
// Inicializa el mapa
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.60807088045763, lng: -58.37687848476906 },
        zoom: 15,
        styles: [
            {
                featureType: "all",
                stylers: [{ saturation: -80 }],
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ hue: "#00ffee" }, { saturation: 50 }],
            },
            {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
            },
        ],
    });
}

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