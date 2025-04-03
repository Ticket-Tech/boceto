const carouselContainer = document.querySelector('.carousel-container');
const serviciosContainer = document.querySelector('.servicios-container');
const servicioCards = Array.from(serviciosContainer.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let servicioCardWidth = 0;
let servicioCardMargin = 0;
let currentPosition = 0;
const totalCards = servicioCards.length;
let autoScrollInterval;
let isPaused = false;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let autoScrollTimeout;
let isUserInteracting = false; // Nueva bandera

const servicioCardWidthTablet = 300;
const servicioCardMarginTablet = 10;

function updateCarousel() {
    if (window.innerWidth <= 767) {
        serviciosContainer.scrollLeft = currentPosition * servicioCardWidth;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        serviciosContainer.scrollLeft = currentPosition * (servicioCardWidth + servicioCardMargin);
    } else {
        serviciosContainer.style.transform = `translateX(-${currentPosition * servicioCardWidth}px)`;
    }
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (!isPaused && !isDragging && !isUserInteracting) { // Comprobar si el usuario está interactuando
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
        servicioCardWidth = serviciosContainer.offsetWidth;
        servicioCardMargin = 0;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        servicioCardWidth = 300;
        servicioCardMargin = 10;
    } else {
        servicioCardWidth = 308;
        servicioCardMargin = 20;
    }
}

window.addEventListener('load', () => {
    calculateCardWidth();
    updateCarousel();
    if (window.innerWidth >= 768) {
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
        startAutoScroll();
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

serviciosContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - serviciosContainer.offsetLeft;
    scrollLeft = serviciosContainer.scrollLeft;
    stopAutoScroll();
    isUserInteracting = true; // El usuario está interactuando
});

serviciosContainer.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const x = e.touches[0].pageX - serviciosContainer.offsetLeft;
        const walk = (x - startX) * 3;
        serviciosContainer.scrollLeft = scrollLeft - walk;
    }
});

serviciosContainer.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        if (window.innerWidth <= 767) {
            currentPosition = Math.round(serviciosContainer.scrollLeft / servicioCardWidth);
        } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
            currentPosition = Math.round(serviciosContainer.scrollLeft / (servicioCardWidth + servicioCardMargin));
        }
        updateCarousel();
        setTimeout(resetAutoScroll, 2000);
        isUserInteracting = false; // El usuario ha terminado de interactuar
    }
});

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

// ... (resto de tu código JavaScript para modales) ...
document.addEventListener('DOMContentLoaded', function() {
    // Modal de contacto
    const contactoModal = document.getElementById('contacto-modal');
    const contactoLink = document.querySelector('.contacto a');
    const contactoCloseBtn = document.querySelector('.contacto-close');

    contactoLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactoModal.style.display = 'flex';
        setTimeout(() => {
            contactoModal.classList.add('show');
        }, 10);
    });

    contactoCloseBtn.addEventListener('click', function() {
        contactoModal.classList.remove('show');
        setTimeout(() => {
            contactoModal.style.display = 'none';
        }, 400);
    });

    window.addEventListener('click', function(event) {
        if (event.target == contactoModal) {
            contactoModal.classList.remove('show');
            setTimeout(() => {
                contactoModal.style.display = 'none';
            }, 400);
        }
    });

    const form = document.getElementById('mi-formulario');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = encodeURIComponent(document.getElementById('nombre-contacto').value);
        const telefono = encodeURIComponent(document.getElementById('telefono-contacto').value);
        const correo = encodeURIComponent(document.getElementById('correo-contacto').value);

        const body = `Nombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}`;

        window.location.href = `mailto:consultas@x-seg.com.ar?subject=Formulario de contacto&body=${body}`;
    });

    // Modal de política de privacidad (modificado)
    const politicaModal = document.getElementById('politica-modal');
    const politicaCloseBtn = document.querySelector('.politica-close');
    const aceptarBtn = document.getElementById('aceptar-btn');
    const aceptarCheckbox = document.getElementById('aceptar-politica');
    const abrirPoliticaModal = document.getElementById('abrir-politica-modal');

    abrirPoliticaModal.addEventListener('click', function(e) {
        e.preventDefault();
        politicaModal.style.display = 'flex';
        setTimeout(() => {
            politicaModal.classList.add('show');
        }, 10);
    });

    politicaCloseBtn.addEventListener('click', function() {
        politicaModal.classList.remove('show');
        setTimeout(() => {
            politicaModal.style.display = 'none';
        }, 400);
    });

    window.addEventListener('click', function(event) {
        if (event.target == politicaModal) {
            politicaModal.classList.remove('show');
            setTimeout(() => {
                politicaModal.style.display = 'none';
            }, 400);
        }
    });

    aceptarBtn.addEventListener('click', function() {
        if (aceptarCheckbox.checked) {
            politicaModal.style.display = 'none';
        } else {
            alert('Debes aceptar la política de privacidad para continuar.');
        }
    });
});