import "@hotwired/turbo-rails"
import "./controllers"
import "./navigation"
import "./news"
import * as bootstrap from "bootstrap"

let menuVisible = false;
const clic = document.getElementById("clic");
const header = document.querySelector("header");
let lastScroll = window.scrollY;
let scrollstop;

window.toggleMenu = function() {
    clic.classList.toggle("responsive");
    menuVisible = !menuVisible;
}

window.hideMenu = function() {
    clic.classList.remove("responsive");
    menuVisible = false;
}

function visibility() {
    const currentscroll = window.scrollY;
    clearTimeout(scrollstop);

    if (Math.abs(currentscroll - lastScroll) > 5) {
        header.classList.add("content-header-hidden");
    }
    scrollstop = setTimeout(() => {
        header.classList.remove("content-header-hidden");
    }, 150);

    lastScroll = currentscroll;
}

console.log("application.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado en application.js');
    
    if (document.querySelector('.news-section')) {
        console.log('Página de noticias detectada en application.js');
        

        if (window.loadNews && typeof window.loadNews === 'function') {
            console.log('Función loadNews disponible, cargando noticias...');
            window.loadNews('technology');
        } else {
            console.error('Función loadNews no disponible');
        }
    }
    window.addEventListener("scroll", visibility);
});
