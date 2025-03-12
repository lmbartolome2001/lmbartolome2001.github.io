let items = document.querySelectorAll('.slider .item');
let active = 0; // Cambiado a 0 para empezar desde el primer slide

function loadShow() {
    items[active].style.transform = `translateY(-50%)`; // Centra la carta activa verticalmente
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    let stt = 0;
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateY(calc(-50% + ${20 * stt}px)) translateX(${70 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateY(calc(-50% + ${20 * stt}px)) translateX(${-70 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function nextSlide() {
    active = (active + 1) % items.length;
    loadShow();
}

function prevSlide() {
    active = (active - 1 + items.length) % items.length;
    loadShow();
}

loadShow();

let next = document.getElementById('next');
let prev = document.getElementById('prev');

next.onclick = function () {
    nextSlide();
}

prev.onclick = function () {
    prevSlide();
}

// Cambio automático cada 3 segundos
let slideInterval = setInterval(nextSlide, 2000);

// Detener el cambio automático al pasar el cursor sobre el slider
document.querySelector('.slider').addEventListener('mouseenter', function () {
    clearInterval(slideInterval);
});

// Reanudar el cambio automático al salir del slider
document.querySelector('.slider').addEventListener('mouseleave', function () {
    slideInterval = setInterval(nextSlide, 3000);
});

// Cambiar imagen al pasar el cursor por encima
items.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
        active = index;
        loadShow();
    });
});