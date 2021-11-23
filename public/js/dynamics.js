addEventListener('load', function(){

    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.user_links');

    const mobileMenu = () =>{
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    }

    menu.addEventListener('click', mobileMenu);

    // Edit image
    const editImg = document.querySelector(".individual_course_img_small");
    const editImageInput = document.querySelector(".edit_image");
    const editButton = document.querySelector(".edit_img_button");

    editImg.addEventListener('mouseover', function(){
        editButton.classList.add("edit_btn_active");
    });
    editImg.addEventListener('mouseout', function(){
        editButton.classList.remove("edit_btn_active");
    });


    editButton.addEventListener('click', function(){
        editImageInput.classList.toggle('edit_image_active');
    })
    

});