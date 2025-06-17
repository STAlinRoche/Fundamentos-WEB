const toggle = document.getElementById('menu-toggle');
const navlinks = document.querySelectorAll('.nav-link');
toggle.addEventListener('click', () => {
    navlinks.forEach(nav =>nav.classList.toggle('active'));


    
});