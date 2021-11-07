const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.user_links');

const mobileMenu = () =>{
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}

menu.addEventListener('click', mobileMenu);