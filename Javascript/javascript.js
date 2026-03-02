const comicImagePath = "../Assets/accueil.png";

const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const backBtn = document.getElementById('backBtn');
let menuOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    const comicGrid = document.getElementById('comicGrid');
    if (comicGrid) {
        comicGrid.style.backgroundImage = `url("${comicImagePath}")`;
    }

    const btnAbout = document.getElementById('btn-1');
    const btnStack = document.getElementById('btn-2');
    const btnExpertise = document.getElementById('btn-3');
    const btnContact = document.getElementById('btn-4');

    if (btnAbout) btnAbout.addEventListener('click', () => openSection('about'));
    if (btnStack) btnStack.addEventListener('click', () => openSection('stack'));
    if (btnExpertise) btnExpertise.addEventListener('click', () => openSection('expertise'));
    if (btnContact) btnContact.addEventListener('click', () => openSection('contact'));

    if (backBtn) backBtn.addEventListener('click', closeSection);
});

function openSection(sectionName) {
    const comicContainer = document.getElementById('comicContainer');
    const section = document.getElementById('section-' + sectionName);
    const backBtn = document.getElementById('backBtn');

    if (comicContainer) comicContainer.classList.add('hidden');
    if (section) section.classList.add('active');
    if (backBtn) backBtn.style.display = 'block';

    if (section) section.scrollTop = 0;
}

function closeSection() {
    const comicContainer = document.getElementById('comicContainer');
    const sections = document.querySelectorAll('.content-section');
    const backBtn = document.getElementById('backBtn');

    sections.forEach(section => section.classList.remove('active'));
    if (comicContainer) comicContainer.classList.remove('hidden');
    if (backBtn) backBtn.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSection();
    }
});

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 1.2 + 0.3);
        this.speedX = (Math.random() * 0.6) - 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.swing) * 0.4;
        this.swing += this.swingSpeed;

        if (this.y < -20) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(10, 10, 10, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particlesArray = [];
const particleCount = 100;

function init() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

const particleToggle = document.getElementById('particleToggle');
const particleCanvas = document.getElementById('particles-canvas');

if (particleToggle) {
    particleToggle.addEventListener('change', () => {
        if (particleToggle.checked) {
            particleCanvas.style.display = 'block';
        } else {
            particleCanvas.style.display = 'none';
        }
    });
}

init();
animate();
