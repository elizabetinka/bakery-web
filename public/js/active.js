document.addEventListener("DOMContentLoaded", () => {
   
    const currentLocation = window.location.pathname;
    const menuLinks = document.querySelectorAll(".menu_a");
    
    menuLinks.forEach(link => {
        if (currentLocation.endsWith(link.getAttribute("href"))) {
            link.classList.add("menu_a__active");
        }
    });
});