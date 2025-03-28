document.addEventListener('DOMContentLoaded', function() {
    let menuVisible = false;
    let lastScroll = window.scrollY;
    let scrollstop;

    const clic = document.getElementById("clic");
    const header = document.querySelector(".content-header");

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
    
    window.addEventListener("scroll", () => {
        visibility();
    });
}); 