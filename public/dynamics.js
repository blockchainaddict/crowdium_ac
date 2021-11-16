const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.user_links');

const mobileMenu = () =>{
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}

menu.addEventListener('click', mobileMenu);

// To make profile editable

const edit_link = document.querySelector('#edit_button');
const editables = document.querySelectorAll('#user_data_input');
const submitEditForm = document.querySelector('#edit_user');

const editable = () =>{
    edit_link.classList.toggle('hide_button');
    submitEditForm.classList.toggle('inactive');
    for(let i=0; i<editables.length; i++){
        editables[i].toggleAttribute('disabled');
    }
    console.log('All toggled');
    
}

edit_link.addEventListener('click', editable);